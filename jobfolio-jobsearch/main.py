from fastapi import FastAPI
from models import JobSearchRequest
from jobspy_client import search_jobs

app = FastAPI(title="JobTracker Job Search Service")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/search")
def search(request: JobSearchRequest):
    results = search_jobs(request)
    return {"count": len(results), "jobs": results}