import re,pathlib
b=pathlib.Path(__file__).parent
css=(b/"base.css").read_text()
drop=re.compile(r'^(\.wrap|header|h1\{|h2\{|h1 span|\.banner|\.panel|\.jump|\.caption|\.pair|\.shot|\.lineup|\.changes)\b')
css="\n".join(l for l in css.splitlines() if not drop.match(l))+"\n"+(b/"extra.css").read_text()+"\n"+(b/"mini.css").read_text()+"\n"+(b/"board.css").read_text()+"\n"+(b/"home.css").read_text()+"\n"+(b/"social.css").read_text()+"\n"+(b/"monster.css").read_text()
worlds=",\n".join(x.read_text().rstrip().rstrip(",") for x in [b/"yard.js",b/"manor.js",b/"sea.js",b/"snow.js",b/"theater.js",b/"city.js",b/"mall.js",b/"space.js"])
soon=(b/"soon.js").read_text().rstrip().rstrip(",")
game=(b/"game.js").read_text().replace("/*WORLDS*/",worlds).replace("/*SOON*/",soon).replace("/*MINI*/",(b/"mini.js").read_text()+"\n"+(b/"board.js").read_text()+"\n"+(b/"social.js").read_text()+"\n"+(b/"monster.js").read_text())
js=(b/"name-check.js").read_text()+"\n"+(b/"quackers-stats.js").read_text()+"\n"+(b/"art.js").read_text()+"\n"+(b/"accs.js").read_text()+"\n"+(b/"spaceart.js").read_text()+"\n"+game
html=(b/"shell.html").read_text().replace("/*CSS*/",css).replace("/*JS*/",js)

(b.parent/"index.html").write_text(html)
print(len(html))
