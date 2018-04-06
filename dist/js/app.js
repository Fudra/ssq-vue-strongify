webpackJsonp([1], {
  YuRo: function (t, e) {
  }, lVK7: function (t, e, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var n = s("gRE1"), a = s.n(n), r = {
      name: "vue-strongify",
      data: function () {
        return {
          strength: 0,
          maxStength: 4,
          hasNumber: !1,
          hasLowercase: !1,
          hasUppercase: !1,
          hasSpecial: !1,
          rules: {
            regex: {
              hasNumber: /\d/,
              hasLowercase: /[a-z]/,
              hasUppercase: /[A-Z]/,
              hasSpecial: /[!@#$%^&*)(+=._-]/
            }, custom: {hasVariation: this.hasVariationRule, hasBigVariationRule: this.hasBigVariationRule}
          }
        }
      },
      props: {
        minLength: {type: Number, default: 6},
        password: {type: String, default: ""},
        withComments: {type: Boolean, default: !1}
      },
      watch: {
        password: function (t) {
          this.checkPasswordStrength(t)
        }
      },
      methods: {
        setStrength: function (t) {
          t > this.maxStength ? this.strength = this.maxStength : this.strength = t
        }, checkPasswordStrength: function (t) {
          var e = 0;
          t.length < this.minLength ? this.strength = 0 : (a()(this.rules.regex).forEach(function (s) {
            s.test(t) && (e += 1)
          }), a()(this.rules.custom).forEach(function (s) {
            s(t) && (e += 1)
          }), this.setStrength(e))
        }, hasVariationRule: function (t) {
          for (var e = [], s = 0, n = t.length; s < n; s++) {
            var a = t.charAt(s);
            -1 === e.indexOf(a) && e.push(a)
          }
          return e.length >= this.minLength + 2
        }, hasBigVariationRule: function (t) {
          for (var e = [], s = 0, n = t.length; s < n; s++) {
            var a = t.charAt(s);
            -1 === e.indexOf(a) && e.push(a)
          }
          return e.length >= this.minLength + 6
        }
      }
    }, i = {
      render: function () {
        var t = this, e = t.$createElement, s = t._self._c || e;
        return s("div", {staticClass: "vue-strongify"}, [s("div", {class: ["bar", {"bar--with-comments": t.withComments}]}, [s("div", {
          staticClass: "fill",
          attrs: {"data-score": t.strength}
        })]), t._v(" "), t.withComments && t.strength > 0 ? s("div", {staticClass: "comment"}, [t._v(t._s(t.$t("strongify.comment." + t.strength)))]) : t._e()])
      }, staticRenderFns: []
    };
    var h = s("VU/8")(r, i, !1, function (t) {
      s("YuRo")
    }, null, null).exports;
    e.default = h
  }
}, ["lVK7"]);
//# sourceMappingURL=app.js.map
