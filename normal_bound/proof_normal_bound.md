```
PDF: probability density function
RV: random variable
mu.tex: \mu
eps.tex: \varepsilon
```

Proposition:

Let
  mu < 0 be a real number and
  X be an RV with
    PDF f_X,
    E[X] = mu and
    f_X(x - dx)=f_X(x + dx) for all real numbers dx.
Then
  logistic(mu) < E[logistic(X)].

Proof:

For sake of brevity we introduce
  w(x) := logistic(x) = 1/(1+exp(-x)).
The expectation of w(X) = logistic(X) is defined as
  E[w(X)] = Integral(w(z)*f_X(z), z, (-infinity, +infinity)).
A linear change of variables yields
  E[w(X)] = Integral(w(mu+z)*f_X(mu+z), z, (-infinity, +infinity))
and "folding the integral at z=0" yields
  E[w(X)] = Integral((w(mu+z)+w(mu-z))*f_X(mu+z), z, (0, +infinity))
where we used the symmetry of f_X around mu.

To show that E[w(X)] > w(mu) it is sufficient to show that
  w(mu+z)+w(mu-z) > 2*w(mu) almost everywhere for fixed mu
because then
  E[w(X)] =
    Integral((w(mu+z)+w(mu-z))*f_X(mu+z), z, (0, +infinity)) > Integral(2*w(mu)*f_X(mu+z), z, (0, +infinity))
    = w(mu).

We now show that
  w(mu+z) + w(mu-z) > 2 * w(mu)
for negative mu and nonzero real z.
Using the definition of w and combining all fractions to one we get
  w(mu+z) + w(mu-z) - 2 * w(mu) = N(mu,z)/D(mu,z)
with
  N(mu,z) = wD(mu-z)*wD(mu) + wD(mu+z)*wD(mu) - 2*wD(mu-z)*wD(mu+z) and
  D(mu,z) = wD(mu+z)*wD(mu-z)*wD(mu) > 0
using the abbreviation wD(mu) := 1+exp(-mu). To show that
  w(mu+z) + w(mu-z) > 2 * w(mu) for nonzero z
it is sufficient to show that N(mu,z) > 0. Expanding all products in the
definition of N(mu,z) yields
  N(mu,z) =
    + 2 * exp(-mu)
    - 2 * exp(-2*mu)
    + exp(-2 * mu + z)
    - exp(-mu+z)
    + exp(-2 * mu - z)
    - exp(-mu - z).
As exp(mu) > 0 for all real numbers mu we get
  N(mu,z) >= 0 iff Nt(mu,z) := N(mu,z)*exp(mu) >= 0.
We get
  Nt(mu, z) =
    2
    - 2 * exp(-mu)
    + exp(-mu+z)
    - exp(z)
    + exp(-mu - z)
    - exp(-z)
Direct computation reveals that Nt(0,z) = 0. Furthermore we can compute
  dNt/dmu(mu,z) =
    + 2 * exp(-mu)
    - exp(-mu + z)
    - exp(-mu - z) =
    exp(-mu) * (
      2 - exp(+z) - exp(-z)
    ).

Elementary analysis reveals
  dNt/dmu(mu,z) <= 0
with the inequality being strict if z != 0. From the fundamental theorem of calculus
we have that
  Nt(mu,z) = Nt(0,z) + Integral(dNt/dmu(x,z), x, (0, mu))
for any real number mu. Using
  dNt/dmu(x,z) <= 0 almost everywhere,
  Nt(0,z) = 0 and
  mu < 0
we can bound
  Nt(mu, z) > Nt(0,z) - mu * eps(mu, z) > 0
where eps(mu, z) > 0.
