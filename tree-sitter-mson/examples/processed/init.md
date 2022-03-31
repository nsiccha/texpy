# EXPLICIT CONTROL:

Enable explicit processing with curly brackets.
For inline processing use ![963deeaebe044c4492a69ac154e075f4](figs/963deeaebe044c4492a69ac154e075f4.png) without new lines and
for block processing use 

![bc90c9484a9b560e3e77acc4a09379eb](figs/bc90c9484a9b560e3e77acc4a09379eb.png)

 with at least one new line (and optional indentation).
Labeling works as ![5033f5324431816350df66d3bbe0b855](figs/5033f5324431816350df66d3bbe0b855.png) or 

![91ab0949e26d26795af0eee878fe0367](figs/91ab0949e26d26795af0eee878fe0367.png)


Anything inside curly brackets has to be a valid expression.

Enable explicit inline latex math with \(a\) and
explicit block latex math with \[a.\] No
processing is performed and nothing is enforced for explicit latex math.

No processing is performed inside inline markdown formatting
such as *italic*, **bold**, ***bolditalic***, ~~strikethrough~~, `verbatim` or
[links](http://github.com). Processing is performed inside "block" markdown
formatting such as headers, lists or quotes.


Calls: ![2e6eacdd7f27cbf56429015538b84f19](figs/2e6eacdd7f27cbf56429015538b84f19.png), ![7b2f50570c1828ce55ecda5e43899509](figs/7b2f50570c1828ce55ecda5e43899509.png) or ![ecbcbd2e0798c60e8c0915f905ecadee](figs/ecbcbd2e0798c60e8c0915f905ecadee.png).
Tuples: ![59881c5895f0fb0c2472db34cf1b3104](figs/59881c5895f0fb0c2472db34cf1b3104.png), ![03d388147c5b221dea64fd8cae1f30f2](figs/03d388147c5b221dea64fd8cae1f30f2.png), ![d3ca9839c8cfdfbc2fb36b60a89e5482](figs/d3ca9839c8cfdfbc2fb36b60a89e5482.png), ![2e9203ae2902d1bedbe76b22d4f12e43](figs/2e9203ae2902d1bedbe76b22d4f12e43.png)
Lists: ![db4a07c176b7a00a2acd455d96ecf01d](figs/db4a07c176b7a00a2acd455d96ecf01d.png), ![68346868f9d0bb2a926c9e59ad368470](figs/68346868f9d0bb2a926c9e59ad368470.png), ![13a51c30dd2246c87ae53465f70fe2e4](figs/13a51c30dd2246c87ae53465f70fe2e4.png), ![9df522e17f9bfa5af8ab77e7fde4f7eb](figs/9df522e17f9bfa5af8ab77e7fde4f7eb.png), ![433bcbfb6b37467664b97c19f98395d5](figs/433bcbfb6b37467664b97c19f98395d5.png)
Sets: ![4985e430673d1de4e29fbd3d887a062e](figs/4985e430673d1de4e29fbd3d887a062e.png), ![78da467db282e097d0d507c19774b309](figs/78da467db282e097d0d507c19774b309.png), ![5d03e6eb3000df5c1a770f3ebcd138c5](figs/5d03e6eb3000df5c1a770f3ebcd138c5.png), ![14700546fbcf9eefaafa9c7f342ac181](figs/14700546fbcf9eefaafa9c7f342ac181.png), ![8d084ece46331544ce171005edd70073](figs/8d084ece46331544ce171005edd70073.png)

Unary and binary operations: 

![9471f77aae9c35cbe6fbb874267551cf](figs/9471f77aae9c35cbe6fbb874267551cf.png)


```





# IMPLICIT PROCESSING:

Disable implicit processing with md-code fences.
Anything for which processing begins with an indented new line will be
block processed, otherwise it will be inline processed.

Any valid binary mathematical operation will enter processing mode
except for `-`, `@` and word operators such as `in`.

For example, will be processed, but non-positive or foo@bar.com won't be.

Valid tuples (a,b,c), lists [a,b,c] and sets {a,b,c} will be processed as well.
Single element containers require a trailing comma such as (a,), [b,] or {c,}.

```
