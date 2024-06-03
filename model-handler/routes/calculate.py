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

    username = data['username']
    omega = data['omega']
    beta = data['beta']
    alpha = data['alpha']
    lambda0 = data['lambda0']
    lambda1 = data['lambda1']
    Q_max = data['Q_max']
    Q0 = data['Q0']
    T1 = data['T1']
    T2 = data['T2']
    T = data['T']
    c0 = data['c0']

    sol = solve_system(omega, beta, alpha, lambda0, lambda1, Q_max, Q0, T1, T2, T, c0)
    t, S, R = get_results(sol, T)

    result = {
        'time': t.tolist(),
        'capital': S.tolist(),
        'advertising_effect': R.tolist()
    }

    new_result = Result(username=username, result=result)
    db.session.add(new_result)
    db.session.commit()

    logger.info(f"Recorb by: {username} successfully saved!")

    return jsonify(result)

