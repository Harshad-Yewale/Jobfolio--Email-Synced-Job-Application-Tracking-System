from pydantic import BaseModel
from typing import Optional, List


class JobSearchRequest(BaseModel):
    search_term: str
    location: Optional[str] = "India"
    results_wanted: Optional[int] = 15
    site_names: Optional[List[str]] = ["indeed", "linkedin"]


class JobResult(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    job_url: Optional[str] = None
    site: Optional[str] = None
    date_posted: Optional[str] = None
    description: Optional[str] = None