package com.harshadcodes.jobfolio.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePart;
import com.google.api.services.gmail.model.MessagePartHeader;
import com.google.api.services.gmail.model.Profile;
import com.harshadcodes.jobfolio.dto.response.GmailMessageDto;
import com.harshadcodes.jobfolio.entity.EmailConnection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GmailApiService {

    private final GmailOAuthService gmailOAuthService;

    private Gmail buildGmailClient(String accessToken) throws Exception {
        NetHttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();

        return new Gmail.Builder(transport, GsonFactory.getDefaultInstance(), request ->
                request.getHeaders().setAuthorization("Bearer " + accessToken))
                .setApplicationName("Jobfolio")
                .build();
    }

    public String getConnectedEmailAddress(String accessToken) throws Exception {
        Gmail gmail = buildGmailClient(accessToken);
        Profile profile = gmail.users().getProfile("me").execute();
        return profile.getEmailAddress();
    }

    // Fetches recent messages - just metadata (subject, sender, date), not full body,
    // since that's all the keyword classifier will need
    public List<GmailMessageDto> fetchRecentMessages(EmailConnection connection, int maxResults) throws Exception {
        String accessToken = gmailOAuthService.getValidAccessToken(connection);
        Gmail gmail = buildGmailClient(accessToken);

        List<Message> messageList = gmail.users().messages().list("me")
                .setMaxResults((long) maxResults)
                .setQ("newer_than:7d") // only look at emails from the last 7 days
                .execute()
                .getMessages();

        List<GmailMessageDto> results = new ArrayList<>();

        if (messageList == null) {
            return results; // no messages found
        }

        for (Message m : messageList) {
            Message fullMessage = gmail.users().messages().get("me", m.getId())
                    .setFormat("metadata")
                    .setMetadataHeaders(List.of("Subject", "From", "Date"))
                    .execute();

            results.add(toDto(fullMessage));
        }

        return results;
    }

    private GmailMessageDto toDto(Message message) {
        String subject = "";
        String from = "";

        MessagePart payload = message.getPayload();
        if (payload != null && payload.getHeaders() != null) {
            for (MessagePartHeader header : payload.getHeaders()) {
                if (header.getName().equalsIgnoreCase("Subject")) {
                    subject = header.getValue();
                } else if (header.getName().equalsIgnoreCase("From")) {
                    from = header.getValue();
                }
            }
        }

        return new GmailMessageDto(message.getId(), subject, from, message.getSnippet());
    }
}