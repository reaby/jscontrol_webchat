// Generated by CoffeeScript 1.3.2
// @author: Magnetik
// https://github.com/magnetik/maniaplanet-style-js-parser
  var Color, LinkToken, LinkTokenEnd, Style, StyleParser, Token;

  Color = (function() {

    function Color() {}

    Color.hex2rgb = function(hex_color) {
      var color;
      color = parseInt(hex_color, 16);	  
      return [(color & 0xff0000) >> 16, (color & 0xff00) >> 8, color & 0xff];
    };

    Color.rgb12to24 = function(color) {	
      return (color & 0xf00) * 0x1100 + (color & 0xf0) * 0x110 + (color & 0xf) * 0x11;
    };

    Color.rgbToLuminance = function(rgb) {
      return 0.2126 * Math.pow(rgb[0] / 255, 2.2) + 0.7151 * Math.pow(rgb[1] / 255, 2.2) + 0.0721 * Math.pow(rgb[2] / 255, 2.2);
    };

    Color.contrastRatio = function(rgb1, rgb2) {
      return (this.rgbToLuminance(this.hex2rgb(rgb1)) + 0.05) / (this.rgbToLuminance(this.hex2rgb(rgb2)) + 0.05);
    };

    return Color;

  })();

  Style = (function() {

    function Style() {}

    Style.COLORED = 0x1000;

    Style.ITALIC = 0x2000;

    Style.BOLD = 0x4000;

    Style.SHADOWED = 0x8000;

    Style.WIDE = 0x10000;

    Style.NARROW = 0x20000;

    return Style;

  })();

  Token = (function() {

    function Token(style, text) {
      this.style = style;
      this.text = text;
    }

    Token.prototype.toHTML = function() {
      var color, styleStack;
      styleStack = [];
      if (this.style) {
        if (this.style & Style.COLORED) {
          color = parseInt(Color.rgb12to24(this.style & 0xfff), 10).toString(16);
		  if (color.length == 4) color = "00"+color;
          styleStack.push('color: #' + color + ';');
        }
        if (this.style & Style.ITALIC) {
          styleStack.push('font-style:italic;');
        }
        if (this.style & Style.BOLD) {
          styleStack.push('font-weight:bold;');
        }
        if (this.style & Style.SHADOWED) {
          styleStack.push('text-shadow:1px 1px 1px rgba(0, 0, 0, 0.5);');
        }
        if (this.style & Style.WIDE) {
          styleStack.push('letter-spacing:.1em;font-size:105%;');
        } else if (this.style & Style.NARROW) {
          styleStack.push('letter-spacing:-.1em;font-size:95%;');
        }
        return '<span style="' + styleStack.join(' ') + '">' + this.text + '</span>';
      } else {
        return this.text;
      }
    };

    return Token;

  })();

  LinkToken = (function() {

    function LinkToken(link) {
      this.link = link;
    }

    LinkToken.prototype.toHTML = function() {
      return '<a href="' + this.link + '">';
    };

    return LinkToken;

  })();

  LinkTokenEnd = (function() {

    function LinkTokenEnd() {}

    LinkTokenEnd.prototype.toHTML = function() {
      return '</a>';
    };

    return LinkTokenEnd;

  })();

  StyleParser = (function() {

    function StyleParser() {}

    StyleParser.toHTML = function(text) {
      var tokens;
      return ((function() {
        var _i, _len, _ref, _results;
        _ref = this.parse(text);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tokens = _ref[_i];
          _results.push(tokens.toHTML());
        }
        return _results;
      }).call(this)).join('');
    };

    StyleParser.parse = function(text) {
      var code, hex_color, idx, link, linkToken, matches, nextToken, pattern, rawTokens, style, styleStack, token, tokens, _ref, _ref1;
      style = 0;
      pattern = /(\$(?:[0-9a-f][^\$]{0,2}|[lhp](?:\[.*?\])?|.))/;
      rawTokens = text.split(pattern);
      tokens = [];
      nextToken = new Token;
      styleStack = [];
      for (idx in rawTokens) {
        token = rawTokens[idx];
        code = token[0];
        if (code === '$') {
          switch (token[1]) {
            case 'i':
              style = style ^ Style.ITALIC;
              break;
            case 'o':
              style = style ^ Style.BOLD;
              break;
            case 's':
              style = style ^ Style.SHADOWED;
              break;
            case 'w':
              style = style | Style.WIDE;
              style = style & ~Style.NARROW;
              break;
            case 'n':
              style = style | Style.NARROW;
              style = style & ~Style.WIDE;
              break;
            case 'l':
            case 'h':
            case 'p':
              matches = token.match(new RegExp(/\[(.*?)\]/i));
              if (matches) {
                link = matches[1];
              }
              if (typeof linkToken !== "undefined" && linkToken !== null) {
                if (text != null ? text.length : void 0) {
                  tokens.push(nextToken);
                  nextToken = new Token(style);
                } else if (tokens[tokens.length - 1] === linkToken) {
                  delete tokens[tokens.length - 1];
                  linkToken = null;
                  break;
                }
                tokens.push(new LinkTokenEnd);
                linkToken = null;
              } else {
                if (text != null ? text.length : void 0) {
                  tokens.push(nextToken);
                  nextToken = new Token(style);
                }
                linkToken = new LinkToken(link);
                tokens.push(linkToken);
              }
              break;
            case 'z':
              style = (_ref = styleStack.length === 0) != null ? _ref : {
                0: styleStack[styleStack.length - 1]
              };
              break;
            case 'm':
              style = style & ~(Style.NARROW | Style.WIDE);
              break;
            case 'g':
              style = style & ((_ref1 = styleStack.length === 0) != null ? _ref1 : ~{
                0x1fff: stylesStack[stylesStack.length(-1)] | ~0x1fff
              });
              break;
            case '<':
              styleStack.push(style);
              style = null;
              break;
            case '>':
              style = styleStack.pop();
              break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
              hex_color = (token + '').replace(/[^a-f0-9]/gi, '');
              style = style & ~0xfff;
              style = style | (Style.COLORED | (parseInt(hex_color, 16) & 0xfff));
              break;
            case '$':
              nextToken.text = '$';
          }
          if (style !== token.style) {
            if (text != null ? text.length : void 0) {
              tokens.push(nextToken);
              nextToken = new Token(style);
            } else {
              nextToken.style = style;
            }
          }
        } else {
          nextToken.text = token;
        }
      }
      if (text != null ? text.length : void 0) {
        tokens.push(nextToken);
      }
      return tokens;
    };

    return StyleParser;

  })();
