<template>
  <section class="features">
    <h1 class="features__title">{{ $t('title') }}</h1>
    <picture>
      <source media="(max-width: 480px)" srcset="./../../img/webp/bench3.webp 1x, ./../../img/webp/bench.webp 2x " type="image/webp">
      <source media="(max-width: 480px)" srcset="./../../img/bench3.jpg 1x, ./../../img/bench.jpg 2x" type="image/jpg">
      <source media="(min-width: 480px)" srcset="./../../img/webp/bench.webp">
      <img src="./../../img/bench.jpg" alt="bench">
    </picture>
  </section>
</template>

