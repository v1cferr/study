import sys

import requests

# https://padlet.com/empregabilidadetransformese
# https://padlet.com/empregabilidadetransformese/transforme-se-play-s-o-carlos-fi6l7ebxo9fsad7

BASE = "https://padlet.com/empregabilidadetransformese/"
URL = "https://padlet.com/empregabilidadetransformese/breakout-room/mVbpvYpYlEBWqRkn-OPZ4XKxyPdgPvqg1/wish/4b3zaM1J5l3ma2j7"


def main():
    try:
        resp = requests.get(URL, timeout=20)
        html = resp.text
        print(f"Eis o HTML retornado:\n{html}")

        if "O LINK SERÁ DISPONIBILIZADO EM MOMENTO OPORTUNO" in html:
            print("Ainda não liberaram o link.")
            sys.exit(1)

        print("Padrão não encontrado. Talvez o conteúdo tenha mudado.")
        sys.exit(1)

    except Exception as e:
        print(f"Erro ao acessar a página: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
