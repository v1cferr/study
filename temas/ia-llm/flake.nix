{
  description = "Ambiente de estudo IA/LLM (construir do zero) para Intel Arc B580 no NixOS";

  # AVISO: scaffold de partida, nao verificado como build completo.
  # O PyTorch com backend XPU vem de wheels da Intel (fora do nixpkgs) e
  # depende dos drivers da Arc no host. Ajustar no seu NixOS conforme necessario.

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true; # util para experimentos futuros (ex.: CUDA na 5090)
        };
        python = pkgs.python312;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            python
            pkgs.uv # gerenciador de venv/pacotes Python

            # Runtime de GPU Intel (Level Zero + compute runtime + video)
            pkgs.level-zero
            pkgs.intel-compute-runtime
            pkgs.intel-media-driver
            pkgs.ocl-icd

            # Ferramentas uteis
            pkgs.intel-gpu-tools # intel_gpu_top para monitorar a Arc
            pkgs.git
          ];

          shellHook = ''
            echo "Ambiente IA/LLM (Intel Arc B580). Python: $(python --version)"

            # Bibliotecas de runtime visiveis para os wheels do PyTorch/oneAPI
            export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [
              pkgs.level-zero
              pkgs.ocl-icd
              pkgs.stdenv.cc.cc.lib
            ]}:$LD_LIBRARY_PATH

            cat <<'MSG'

            Degraus 0 e 4 (micrograd, BPE) sao Python puro: nao precisam de nada extra.

            Para os degraus com PyTorch (1, 2, 3) na Arc, crie um venv e instale os
            wheels da Intel:

              uv venv .venv && source .venv/bin/activate
              uv pip install torch --index-url https://download.pytorch.org/whl/xpu
              uv pip install numpy

            Confirme que a Arc foi detectada:

              python -c "import torch; print(torch.xpu.is_available()); print(torch.xpu.get_device_name())"

            Monitorar a GPU durante o treino:

              intel_gpu_top

            MSG
          '';
        };
      });
}
