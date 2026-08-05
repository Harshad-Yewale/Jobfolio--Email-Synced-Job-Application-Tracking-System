from jobspy import scrape_jobs
from models import JobSearchRequest, JobResult


def search_jobs(request: JobSearchRequest):
    jobs_df = scrape_jobs(
        site_name=request.site_names,
        search_term=request.search_term,
        location=request.location,
        results_wanted=request.results_wanted,
        hours_old=request.hours_old,
    )

    results = []
    for _, row in jobs_df.iterrows():
        results.append(JobResult(
            title=row.get("title"),
            company=row.get("company"),
            location=str(row.get("location")) if row.get("location") else None,
            job_url=row.get("job_url"),
            site=row.get("site"),
            date_posted=str(row.get("date_posted")) if row.get("date_posted") else None,
            description=row.get("description"),
        ))

    return results