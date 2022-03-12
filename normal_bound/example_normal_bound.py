import numpy as np
import matplotlib.pyplot as plt

def logistic(x): return 1/(1+np.exp(-x))

mu = -1.
eps = 1e-3
eps = 10
x1, x2 = mu-1/eps, mu+eps

# mu = <w,x> = w1 * x1 + (1-w1) * x2
# w1 = (mu - x2)/(x1-x2)
w1 = (mu - x2)/(x1 - x2)
w2 = 1 - w1
x, w = np.array([[x1,x2], [w1,w2]])

print(mu, x @ w)

print(logistic(mu), w @ logistic(x))


x = 10 ** np.linspace(-1, 10)
dx = 10 ** np.linspace(-1,1)

xl = np.add.outer(x, -dx)
xr = np.add.outer(x, -dx)

yE = logistic(x)
Ey = .5*(logistic(xl) + logistic(xr))

dy = yE - Ey.T

fig, ax = plt.subplots(figsize=(16,9))
ax.plot(dx, dy)
fig.savefig('test.png')
