# Obtener valores tipados de IDataReader

Created: 3/07/2021

# ¿Qué es un IDataReader?

La documentación oficial de microsoft lo define como:

> Provides a means of reading one or more forward-only streams of result sets obtained by executing a command at a data source, and is implemented by .NET data providers that access relational databases.

Link: [https://docs.microsoft.com/en-us/dotnet/api/system.data.idatareader?view=net-5.0](https://docs.microsoft.com/en-us/dotnet/api/system.data.idatareader?view=net-5.0)

En Resumen, se trata de una interface que nos permite leer un conjunto de datos de manera secuencial hacia adelante, se implementa mediante proveedores de datos que tienen acceso a bases de datos relacionales

## Implementaciones

Al tratarse de una interfaz, esta puede tener diferentes implementaciones las cuales dependerán del proveedor de datos algunas de las mas populares son:

- SqlDataReader
- MySqlDataReader
- SqliteDataReader

# ¿Cuál es el problema?

La interfaz expone diversos métodos para para acceder a los valores de los registros, sin embargo la manera de acceder es mediante la posición del campo, por ejemplo:

```csharp
using var connection = new SqlConnection();
using var command = connection.CreateCommand();

command.CommandText = "StoredProcedureName";
command.CommandType = CommandType.StoredProcedure;

using IDataReader rd = command.ExecuteReader();
var person = new Person
{
    Name = rd.GetString(0),
    LastName = rd.GetString(1),
    DateOfBirth = rd.GetDateTime(2)
};
```

# ¿Cómo solucionarlo?

Podemos crear nuestro propio método que nos permita acceder a los valores mediante su nombre y asignando el tipo, como se ve en este ejemplo

```csharp
using var connection = new SqlConnection();
using var command = connection.CreateCommand();

command.CommandText = "StoredProcedureName";
command.CommandType = CommandType.StoredProcedure;

using IDataReader rd = command.ExecuteReader();
var person = new Person
{
    Name = rd.GetField<string>("Name"),
    LastName = rd.GetField<string>("LastName"),
    DateOfBirth = rd.GetField<DateTime>("DateOfBirth")
};
```

# ¿Cómo funciona?

Haciendo uso de los [métodos de extensión](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods) debemos crear la siguiente clase estática

```csharp
public static class Extensions 
{
    public static T GetField<T>(this IDataReader reader, string name)
    {
        var value = reader[name];
				
				// En caso que el valor sea nulo retornara el valor default del tipo
        if (value == null || value == DBNull.Value)
        { return default(T); }
				
				// En caso que se trate convertir a un Enum, el metodo de coversion es diferente
        if (typeof(T).IsEnum)
        { return (T)Enum.Parse(typeof(T), value.ToString()); }

				// En caso que se trate convertir a un Nullable<>, el metodo de coversion es diferente
        if (Nullable.GetUnderlyingType(typeof(T)) != null)
        { return (T)value; }

				// Metodo de conversión default
        return (T)Convert.ChangeType(value, typeof(T));
    }
}
```

# Pero la clase SqlDataReader ya cuenta con un método similar

Es correcto, la clase SqlDataReader ya cuenta con el método de extensión [GetFieldValue](https://docs.microsoft.com/es-es/dotnet/api/system.data.sqlclient.sqldatareader.getfieldvalue?view=dotnet-plat-ext-5.0) sin embargo al utilizar esta clase perdemos la modularidad que obtenemos al usar IDataReader ya que al utilizar solo las interfaces podríamos por ejemplo cambiar de SQL Server a MySQL de una manera sencilla