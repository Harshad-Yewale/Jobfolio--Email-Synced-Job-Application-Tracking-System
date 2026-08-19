import { useState } from 'react';
import { useJobSearch } from '../hooks/useJobSearch';
import JobCard from '../components/JobCard';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('India');
  const [hoursOld, setHoursOld] = useState(168);
  const jobSearch = useJobSearch();

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;
  jobSearch.mutate({ search_term: searchTerm, location, hours_old: hoursOld });
};

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22 }}>Search</h1>
        <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>
          Search live job postings from Indeed and LinkedIn.
        </p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Job title or keyword (e.g. Java developer)"
          required
          style={{ flex: 2, minWidth: 220, padding: 10, borderRadius: 8, border: '1px solid var(--line)' }}
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          style={{ flex: 1, minWidth: 140, padding: 10, borderRadius: 8, border: '1px solid var(--line)' }}
        />
        <select
          value={hoursOld}
          onChange={(e) => setHoursOld(Number(e.target.value))}
          style={{ padding: 10, borderRadius: 8, border: '1px solid var(--line)' }}
        >
          <option value={24}>Past 24 hours</option>
          <option value={72}>Past 3 days</option>
          <option value={168}>Past week</option>
          <option value={720}>Past month</option>
        </select>
        <button
          type="submit"
          disabled={jobSearch.isPending}
          style={{ padding: '10px 20px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14 }}
        >
          {jobSearch.isPending ? 'Searching...' : 'Search'}
        </button>
      </form>

      {jobSearch.isPending && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--ink-soft)', padding: '40px 0', justifyContent: 'center' }}>
          <div
            style={{
              width: 16, height: 16, border: '2px solid var(--line)', borderTopColor: 'var(--accent)',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite',
            }}
          />
          <span>Searching job sites — this can take up to 30 seconds...</span>
        </div>
      )}

      {jobSearch.isError && (
        <p style={{ color: 'var(--st-rejected)' }}>Search failed. Try again.</p>
      )}

      {jobSearch.isSuccess && (
        <>
          <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 12 }}>
            {jobSearch.data.count} result{jobSearch.data.count !== 1 ? 's' : ''}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {jobSearch.data.jobs.map((job, i) => (
              <JobCard key={`${job.job_url ?? job.title}-${i}`} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;