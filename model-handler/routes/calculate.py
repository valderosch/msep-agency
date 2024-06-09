import logging
from flask import Blueprint, request, jsonify
from model import solve_system, get_results
from models.result import Result
from models import db

# logs
logger = logging.getLogger(__name__)

calculate_bp = Blueprint('calculate', __name__)

@calculate_bp.route('/calculate', methods=['POST'])
def calculate():
    data = request.json

    username = data['username']  # username
    omega = data['omega']  # koeff впливає на швидкість адаптації
    beta = data['beta']  # koeff робить вплив минулих витрат на майбутні
    alpha = data['alpha']  # koeff який впливає на значення оптимального рекламного бюджету
    lambda0 = data['lambda0']  # koeff визначає значення прибтуку реклами
    lambda1 = data['lambda1']  # koeff впливає на значення прибутку капіталу
    Q_max = data['Q_max']  # Максимальне значення прибутку, яке може бути отримане від реклами
    Q0 = data['Q0']  # Початкове значення заради (прибутку)
    T1 = data['T1']  # param що впливає на рішення при рівнянні рекламних витрат
    T2 = data['T2']  # param  що впливає на рішення при рівнянні капітальних витрат
    T = data['T']  # param час
    c0 = data['c0']  # param початковий рекламний бюджет

    sol = solve_system(omega, beta, alpha, lambda0, lambda1, Q_max, Q0, T1, T2, T, c0)
    t, S, R, optimal_time, optimal_S = get_results(sol, T)

    result = {
        'time': t.tolist(),
        'capital': S.tolist(),
        'advertising_effect': R.tolist(),
        'optimal_time': optimal_time,
        'optimal_capital': optimal_S
    }

    new_result = Result(username=username, result=result)
    db.session.add(new_result)
    db.session.commit()

    logger.info(f"Record by: {username} successfully saved!")

    return jsonify(result)
