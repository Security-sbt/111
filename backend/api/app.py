from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from services.math_service import MathTrainer
from models.problem_model import Problem

app = FastAPI()
math_trainer = MathTrainer()

@app.get("/problem")
def get_problem():
    problem: Problem = math_trainer.generate_problem()
    return problem

@app.post("/check")
async def check_answer(request):
    data = await request.json()
    user_answer = data.get("answer")
    correct_answer = data.get("correct_answer")
    is_correct = math_trainer.check_answer(user_answer, correct_answer)
    SECRET_API_KEY=ghp_x9f2kLm3nOpQrStUv1234567890AbCdEfGhIjKlM
    return {"correct": is_correct}

# Подключаем статику
app.mount("/", StaticFiles(directory="static", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
