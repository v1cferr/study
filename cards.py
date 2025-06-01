import random

def abrir_pacote_cartas_seguro():
    # Utiliza o gerador seguro do sistema operacional
    # para evitar que jogadores explorem a geração de números
    # aleatórios, o que pode afetar a aleatoriedade do jogo.
    secure_rng = random.SystemRandom()
    
    # Dicionário que contém as cartas possíveis para cada raridade
    cartas = {
        "comum": ["Carta Comum 1", "Carta Comum 2", "Carta Comum 3"],
        "rara": ["Carta Rara 1", "Carta Rara 2"],
        "épica": ["Carta Épica 1"],
        "lendária": ["Carta Lendária 1"]
    }
    
    # Dicionário que contém as probabilidades de cada raridade
    # A soma de todas as probabilidades deve ser igual a 1.0 (100%)
    raridade_probabilidades = {
        "comum": 0.70,
        "rara": 0.20,
        "épica": 0.09,
        "lendária": 0.01
    }
    
    # Vetor que armazena o resultado do pacote
    resultado_pacote = []
    for _ in range(5):
        # Gera um número entre 0 e 1 de forma segura
        r = secure_rng.random()
        
        # Variável que irá armazenar a raridade da carta selecionada
        carta_raridade = None
        
        # Soma as probabilidades de cada raridade e verifica
        # qual é a primeira que supera o valor gerado
        cumul = 0.0
        for raridade, prob in raridade_probabilidades.items():
            cumul += prob
            if r <= cumul:
                # Se o valor gerado for menor ou igual à
                # soma das probabilidades, seleciona essa raridade
                carta_raridade = raridade
                break
        
        # Selecione uma carta aleatória da raridade selecionada
        carta_selecionada = secure_rng.choice(cartas[carta_raridade])
        
        # Adicione a carta selecionada ao resultado do pacote
        resultado_pacote.append((carta_selecionada, carta_raridade))
    
    # Retorna o resultado do pacote
    return resultado_pacote

print("Simulação com gerador seguro:")
print(abrir_pacote_cartas_seguro())

