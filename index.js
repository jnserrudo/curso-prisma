import { PrismaClient } from "@prisma/client";

/**
 * este modulo nos va a dar una clase  prismaclient
 * lo interesante es que este prismaclient es la conexion y no tenemos que añadir nada 
 * 
 * Crearemos una instancia de esta clase
 * 
 */

const prisma =new PrismaClient()

//con este objeto ya podemos hacer consultas a nuestra base de datos
 //creamos una funcion main para que podamos hacer sintaxis async / await ahi

const createUsuario=async(usuario)=>{
    const newUser=await prisma.user.create({data:usuario})   
    return newUser
}

async function main(){
    //este user representa la tabla o modelo que creamos en nuestro schema, dentro de este modelo podemos tener metodos
//este metodo create espera un parametro que es un objeto , este objeto tiene una propiedad que es llamada como data y data tiene como valor
// otro objeto , aca es donde especificamos que datos queremos insertar, data representa las columnas que tenemos

   /*  let usuarios=[
        {
            "name": "Juan",
            "email": "juan@gmail.com"
        },
        {
            "name": "Maria",
            "email": "maria@gmail.com"
        },
        {
            "name": "Carlos",
            "email": "carlos@gmail.com"
        },
        {
            "name": "Ana",
            "email": "ana@gmail.com"
        },
        {
            "name": "Luis",
            "email": "luis@gmail.com"
        }
    ]
    usuarios.forEach(async(user)=>{
        let resuser=await createUsuario(user)
        console.log(resuser)
    }) */

    /* const newUser=await createUsuario({
        data:{
            name:"Ozuna",
            email:"ozuna@gmail.com"

        }
    })     */ 

//ahora con esos datos ya estariamos creando un usuario, pero esta insercion de un dato hacia la bd, viaja de nuestro codigo a la bd
//esto es asyncrono por lo que se debe poner await, de hecho cuando termina de insertar nos puede devolver una constante que se llame newuser que contiene los datos del nuevo usuario creado
   
// console.log(newUser)

//el findmany nos va permitir consultar todos los datos de esta tabla, nos va a dar una arreglo  
const allUsuarios=await prisma.user.findMany()
//console.log(allUsuarios)

allUsuarios.map(us=>console.log(us.id+" - "+us.name+" - "+ us.lastname))

//findfirst , significa que vamos a pasar un parametro  y a traves de ese parametro es como el va a buscar un dato, el primero que coincida 
const oneUsuario=await prisma.user.findFirst({
    where:{
        id:2  ,
        name:"Maria"
    }
})

const otherUsuario=await prisma.user.findFirst({
    where:{
        OR:[{id:10},{email:"maria@gmail.com"}]
    }
})
 
//aca el primero que encuentre que cumpla esa copnficion me lo va a devolver
console.log(oneUsuario)

console.log(otherUsuario)


   /*  const delUsuario=await prisma.user.delete({
        where:{
            id:1
        }
    }) */

    //una vez lo elimina lo devuelve

    //console.log(delUsuario)

//  LOS DELETE DEBEN IR DENTRO DE TRYCATCH PORQUE SI NO ENCUENTRA UN USUARIO PARA ELIMINAR, SE DEVOLVERA UN ERROR Y DETENDRIA LA EJECUCION DEL PROGRAMA

try {
    const delUsuario=await prisma.user.delete({
        where:{
            id:2
        }
    }) 

    //una vez lo elimina lo devuelve

    console.log(delUsuario)


} catch (error) {
    
    console.log(error.code)

}

//aca en el where del update, la columna debe ser unica, la otra propiedad que se pasa es data
const updatedUsuario=await prisma.user.update({
    where:{
        id:3
    },
    data:{
        lastname:"maluma"
    }

})

console.log(updatedUsuario)

//en los updates many ya no necesito un campo que sea unico
const updatedUsuarios=await prisma.user.updateMany({
    where:{
        lastname:null
    },
    data:{
        lastname:"maluma"
    }

})

console.log(updatedUsuarios)//devuelve un contador

}

//main()

const upsert=async()=>{
    //nos permite   
    //tenemos un where para buscar el dato
    //create, que es lo que vamos a añadir  si no encontro el dato
    //update lo que va a actualizar en caso de que el dato ya existe 

    const resUpsert=await prisma.user.upsert({
        where:{
            email:"ozuna@gmail.com"
        },
        create:{
            name:"carlitos",
            email:"ozuna@gmail.com"


        },
        update:{
            lastname:"maluma"
        }
    })

    console.log(resUpsert)

}
upsert()