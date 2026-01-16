var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var theme_exports = {};
__export(theme_exports, {
  themes: () => themes
});
module.exports = __toCommonJS(theme_exports);
var import_theme_builder = require("@tamagui/theme-builder"), Colors = __toESM(require("@tamagui/colors"));
const darkPalette = [
  "hsla(0, 15%, 1%, 1)",
  "hsla(0, 15%, 6%, 1)",
  "hsla(0, 15%, 12%, 1)",
  "hsla(0, 15%, 17%, 1)",
  "hsla(0, 15%, 23%, 1)",
  "hsla(0, 15%, 28%, 1)",
  "hsla(0, 15%, 34%, 1)",
  "hsla(0, 15%, 39%, 1)",
  "hsla(0, 15%, 45%, 1)",
  "hsla(0, 15%, 50%, 1)",
  "hsla(0, 15%, 93%, 1)",
  "hsla(0, 15%, 99%, 1)"
], lightPalette = [
  "hsla(0, 15%, 99%, 1)",
  "hsla(0, 15%, 94%, 1)",
  "hsla(0, 15%, 88%, 1)",
  "hsla(0, 15%, 83%, 1)",
  "hsla(0, 15%, 77%, 1)",
  "hsla(0, 15%, 72%, 1)",
  "hsla(0, 15%, 66%, 1)",
  "hsla(0, 15%, 61%, 1)",
  "hsla(0, 15%, 55%, 1)",
  "hsla(0, 15%, 50%, 1)",
  "hsla(0, 15%, 15%, 1)",
  "hsla(0, 15%, 1%, 1)"
], lightShadows = {
  shadow1: "rgba(0,0,0,0.04)",
  shadow2: "rgba(0,0,0,0.08)",
  shadow3: "rgba(0,0,0,0.16)",
  shadow4: "rgba(0,0,0,0.24)",
  shadow5: "rgba(0,0,0,0.32)",
  shadow6: "rgba(0,0,0,0.4)"
}, darkShadows = {
  shadow1: "rgba(0,0,0,0.2)",
  shadow2: "rgba(0,0,0,0.3)",
  shadow3: "rgba(0,0,0,0.4)",
  shadow4: "rgba(0,0,0,0.5)",
  shadow5: "rgba(0,0,0,0.6)",
  shadow6: "rgba(0,0,0,0.7)"
}, builtThemes = (0, import_theme_builder.createThemes)({
  componentThemes: import_theme_builder.defaultComponentThemes,
  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette
    },
    extra: {
      light: {
        // Dashboard-y, neutro (mejor contraste que el default)
        background: "#ffffff",
        backgroundHover: "#f8fafc",
        backgroundPress: "#f1f5f9",
        backgroundFocus: "#eef2f6",
        borderColor: "#e2e8f0",
        borderColorHover: "#cbd5e1",
        color: "#0f172a",
        colorHover: "#0b1220",
        colorPress: "#0a0f1a",
        colorFocus: "#64748b",
        placeholderColor: "#94a3b8",
        // Acento azul (para active states del sidebar)
        ...Colors.blue,
        blue1: "#eff6ff",
        blue2: "#dbeafe",
        blue3: "#bfdbfe",
        // Sin morado: mantenemos el sistema limpio con azules + estados
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1
      },
      dark: {
        background: "#0b1220",
        backgroundHover: "#0f172a",
        backgroundPress: "#111c33",
        backgroundFocus: "#162241",
        borderColor: "#1f2a44",
        borderColorHover: "#2a385c",
        color: "#e5e7eb",
        colorHover: "#f3f4f6",
        colorPress: "#ffffff",
        colorFocus: "#94a3b8",
        placeholderColor: "#64748b",
        ...Colors.blueDark,
        // Sin morado en dark también
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1
      }
    }
  },
  accent: {
    palette: {
      dark: [
        "hsla(200, 50%, 35%, 1)",
        "hsla(200, 50%, 38%, 1)",
        "hsla(200, 50%, 41%, 1)",
        "hsla(200, 50%, 43%, 1)",
        "hsla(200, 50%, 46%, 1)",
        "hsla(200, 50%, 49%, 1)",
        "hsla(200, 50%, 52%, 1)",
        "hsla(200, 50%, 54%, 1)",
        "hsla(200, 50%, 57%, 1)",
        "hsla(200, 50%, 60%, 1)",
        "hsla(250, 50%, 90%, 1)",
        "hsla(250, 50%, 95%, 1)"
      ],
      light: [
        "hsla(200, 50%, 45%, 1)",
        "hsla(200, 50%, 47%, 1)",
        "hsla(200, 50%, 49%, 1)",
        "hsla(200, 50%, 52%, 1)",
        "hsla(200, 50%, 54%, 1)",
        "hsla(200, 50%, 56%, 1)",
        "hsla(200, 50%, 58%, 1)",
        "hsla(200, 50%, 61%, 1)",
        "hsla(200, 50%, 63%, 1)",
        "hsla(200, 50%, 65%, 1)",
        "hsla(250, 50%, 95%, 1)",
        "hsla(250, 50%, 95%, 1)"
      ]
    }
  },
  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow)
      }
    },
    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red)
      }
    },
    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green)
      }
    }
  }
  // optionally add more, can pass palette or template
  // grandChildrenThemes: {
  //   alt1: {
  //     template: 'alt1',
  //   },
  //   alt2: {
  //     template: 'alt2',
  //   },
  //   surface1: {
  //     template: 'surface1',
  //   },
  //   surface2: {
  //     template: 'surface2',
  //   },
  //   surface3: {
  //     template: 'surface3',
  //   },
  // },
}), themes = process.env.TAMAGUI_ENVIRONMENT === "client" && process.env.NODE_ENV === "production" ? {} : builtThemes;
//# sourceMappingURL=theme.js.map
