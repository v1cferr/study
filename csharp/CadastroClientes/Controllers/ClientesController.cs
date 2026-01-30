using Microsoft.AspNetCore.Mvc;
using CadastroClientes.Models;

namespace CadastroClientes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    // Simulação de Banco de Dados em Memória
    private static readonly List<Cliente> clientes =
    [
        new Cliente { Id = 1, Nome = "Victor Ferreira (@v1cferr)", Email = "dev.victorferreira@gmail.com", Cidade = "São Carlos" },
        new Cliente { Id = 2, Nome = "Marlucy Baldan", Email = "marlucy.baldan@triplos.com.br", Cidade = "São Carlos" },
        new Cliente { Id = 3, Nome = "Marivaldo Souza", Email = "marivaldo.souza@triplos.com.br", Cidade = "São Carlos" },
        new Cliente { Id = 4, Nome = "Andre Duarte", Email = "andre.duarte@triplos.com.br", Cidade = "São Carlos" }
    ];

    // GET: api/clientes
    [HttpGet]
    public ActionResult<List<Cliente>> Get()
    {
        return Ok(clientes);
    }

    // POST: api/clientes
    [HttpPost]
    public ActionResult<Cliente> Post(Cliente novoCliente)
    {
        novoCliente.Id = clientes.Count > 0 ? clientes.Max(c => c.Id) + 1 : 1;
        clientes.Add(novoCliente);
        return CreatedAtAction(nameof(Get), new { id = novoCliente.Id }, novoCliente);
    }
}