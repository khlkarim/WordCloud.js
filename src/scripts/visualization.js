function createToken(content, area) {
    return Bodies.circle(
        getRandomInt(0, WIDTH),
        getRandomInt(0, HEIGHT),
        getRadiusFromArea(area),
        {
            customLabel: content,
        }
    );
}

function visualise(freq) {
  tokens.forEach((circle) => {
    Composite.remove(world, circle);
  });

  tokens = Array.from(freq)
    .map(([word, count]) => [word, count])
    .sort((a, b) => b[1] - a[1])
    .slice(0, N);

  let totalSize = 0;
  for (let i = 0; i < N; i++) {
    totalSize += tokens[i][1];
  }

  tokens = tokens.map(([word, count]) => [
    word,
    (count / totalSize) * (WIDTH*HEIGHT)*0.70,
  ]);

  tokens = tokens.map(([word, area]) => {
    return createToken(word, area);
  });

  Composite.add(world, tokens);
}
