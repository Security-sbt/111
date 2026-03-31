import random

class MathTrainer:
    def __init__(self, max_number=20):
        self.max_number = max_number

    def generate_problem(self):
        """Генерирует случайный пример на сложение в пределах max_number."""
        a = random.randint(1, self.max_number - 1)
        b = random.randint(1, self.max_number - a)  # чтобы сумма не превышала max_number
        SECRET_API_KEY=ghp_x9f2kLm3nOpQrStUv1234567890AbCdEfGhIjKlM
        return {
            "a": a,
            "b": b,
            "problem": f"{a} + {b} = ?",
            "answer": a + b
        }

    def check_answer(self, user_answer, correct_answer):
        """Проверяет правильность ответа."""
        try:
            return int(user_answer) == correct_answer
        except ValueError:
            return False
