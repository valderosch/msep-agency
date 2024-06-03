import numpy as np
from scipy.integrate import solve_ivp

def model(t, y, omega, beta, alpha, lambda0, lambda1, Q_max, Q0, T1, T2, c0):
    S, R = y
    if t <= T1:
        Q = Q_max
    elif T1 < t <= T2:
        Q = Q0
    else:
        Q = 0

    dR_dt = -omega * R + beta * Q
    lambda_total = lambda0 + lambda1 * R
    dS_dt = alpha * lambda1 * R + (alpha * lambda0 - c0) - Q

    return [dS_dt, dR_dt]

def solve_system(omega, beta, alpha, lambda0, lambda1, Q_max, Q0, T1, T2, T, c0):
    # start values
    S0 = 0  # start capital
    R0 = 0  # start effect

    sol = solve_ivp(model, [0, T], [S0, R0], args=(omega, beta, alpha, lambda0, lambda1, Q_max, Q0, T1, T2, c0), dense_output=True)

    return sol

def get_results(sol, T):
    t = np.linspace(0, T, 300)
    S, R = sol.sol(t)
    return t, S, R
