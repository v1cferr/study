namespace CadastroClientes.Models;

public class Cliente
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Cidade { get; set; } = string.Empty;
    public DateTime DataCadastro { get; set; } = DateTime.Now;
}