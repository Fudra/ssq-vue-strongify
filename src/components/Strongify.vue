<template>
  <div class="vue-strongify">
    <div :class="['bar', { 'bar--with-comments': withComments }]">
      <div class="fill" :data-score="strength"></div>
    </div>

    <div class="comment" v-if="withComments && strength > 0">
      {{ $t('strongify.comment.' + strength) }}
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
  export default {
    name: 'vue-strongify',
    data () {
      return {
        strength: 0,
        maxStength: 4,
        // hasNumber: false,
        // hasLowercase: false,
        // hasUppercase: false,
        // hasSpecial: false,
        rules: {
          regex: {
            hasNumber: /\d/,
            hasLowercase: /[a-z]/,
            hasUppercase: /[A-Z]/,
            hasSpecial: /[!@#$%^&*)(+=._-]/,
          },
          custom: {
            hasVariation: this.hasVariationRule,
            hasBigVariationRule: this.hasBigVariationRule,
          },
        },
      };
    },
    props: {
      minLength: {
        type: Number,
        default: 6,
      },
      password: {
        type: String,
        default: '',
      },
      withComments: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      password: {
        handler(value) {
          this.checkPasswordStrength(value);
        }
      }
    },
    methods: {
      setStrength (strength) {
        if (strength > this.maxStength) {
          this.strength = this.maxStength;
        } else {
          this.strength = strength;
        }
      },
      checkPasswordStrength (password) {
        let result = 0;

        if (password.length < this.minLength) {
          // this.strength  = 0;
          result = 0;
        } else {
          Object.values(this.rules.regex).forEach((rule) => {
            if (rule.test(password)) {
              result += 1;
            }
          });

          Object.values(this.rules.custom).forEach((rule) => {
            if (rule(password)) {
              result += 1;
            }
          });

          this.setStrength(result);
        }
      },
      hasVariationRule (password) {
        const chars = [];

        for (let i = 0, length = password.length; i < length; i++) {
          const char = password.charAt(i);

          if (chars.indexOf(char) === -1) {
            chars.push(char);
          }
        }

        return chars.length >= this.minLength + 2;
      },
      hasBigVariationRule (password) {
        const chars = [];

        for (let i = 0, length = password.length; i < length; i++) {
          const char = password.charAt(i);

          if (chars.indexOf(char) === -1) {
            chars.push(char);
          }
        }

        return chars.length >= this.minLength + 6;
      },
    },
  };
</script>

<style lang="less">
  @height: 6px;

  .vue-strongify {
    display: flex;
    margin: 16px auto 8px;

    .bar {
      position: relative;
      height: @height;
      width: 100%;
      margin: auto 0;
      background: #ddd;

      .fill {
        background: transparent;
        height: inherit;
        position: absolute;
        width: 0;
        border-radius: inherit;
        transition: width .5s ease-in-out,background .25s;

        &[data-score="1"] {
          background: #CF1919;
          width: 25%;
        }

        &[data-score="2"] {
          background: #E73434;
          width: 50%;
        }

        &[data-score="3"] {
          background: #FDB135;
          width: 75%;
        }

        &[data-score="4"] {
          background: #6AC072;
          width: 100%;
        }
      }

      &:before, &:after {
        content: "";
        height: inherit;
        background: transparent;
        display: block;
        border-color: #fff;
        border-style: solid;
        border-width: 0 5px;
        position: absolute;
        width: 50%;
        z-index: 10;
      }

      &:before {
        left: 25%;
      }

      &:after {
        left: 50%;
        border-right: none;
      }

      &--with-comments {
        width: 70%;
      }
    }

    .comment {
      margin-left: auto;
      color: #929292;
      font-size: 14px;
      line-height: @height;
    }
  }
</style>
