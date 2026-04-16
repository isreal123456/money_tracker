# Finance Tracker Backend (FastAPI, Sync)

Synchronous FastAPI backend for auth, transactions, categories, budget, goals, reports, notifications, and settings.

## Project Structure

- `main.py` - compatibility entrypoint (`app` and `reset_store` export)
- `app/main.py` - FastAPI app factory and router wiring
- `app/schemas.py` - Pydantic request/response models
- `app/store.py` - in-memory data store and `reset_store`
- `app/services.py` - shared business helpers
- `app/dependencies.py` - auth dependency (`get_current_user`)
- `app/routers/` - endpoint modules grouped by domain
- `tests/test_api.py` - integration tests with `TestClient`

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run

```powershell
uvicorn main:app --reload
```

Open docs at `http://127.0.0.1:8000/docs`.

## Test

```powershell
pytest -q
```

## Auth Header

```text
Authorization: Bearer <token>
```
