import { Request, Response } from 'express';
import  Comment  from '../Data/models/comments';
import Channel from '../Data/models/chanel';

class  commentsController {
   public static async getComments(req: Request, res: Response) {
        try {
            const comments = await Comment.find()
            return res.send({ msg:"Comentarios obtenidos correctamente",comments });
        } catch (error) {
            return res.status(500).send({ message: "Error al obtener los comentarios", error });
        }
        }
        
        
   public static async createComment(req: Request, res: Response) {
    const  author= req.user?._id;
     try {
            const { content, channel } = req.body;
            const newComment = new Comment({ content, channel,author});
            await newComment.save();
            return res.send({ msg: "Comentario creado correctamente", newComment });
     } catch (error) {
            res.status(500).send({ message: "Error al crear el comentario", error });
        }
  }


   public static async updateComment(req: Request, res: Response) {
    const author = req.user?._id;
    const { id } = req.params;
    const { content } = req.body;

    try {
        // Buscar el comentario por ID
        const comment = await Comment.findById(id);
        
        // Verificar si el comentario existe
        if (!comment) {
            return res.status(404).send({ message: "Comentario no encontrado" });
        }

        // Verificar si el usuario es el autor del comentario
        if (comment.author.toString() !== author.toString()) {
            return res.status(403).send({ message: "No tienes permiso para actualizar este comentario" });
        }

        // Actualizar el comentario
        comment.content = content;

        // Guardar los cambios
        await comment.save();

        // Responder con el comentario actualizado
        return res.status(200).send({ message: "Comentario actualizado correctamente", comment });

    } catch (error) {
        res.status(500).send({ message: "Error al actualizar el comentario", error });
    }
   }

  public static async deleteComment(req: Request, res: Response) {

    const author = req.user?._id;
    const { id } = req.params;

    try {
        // Buscar el comentario por ID
        const comment = await Comment.findById(id);
        
        // Verificar si el comentario existe
        if (!comment) {
            return res.status(404).send({ message: "Comentario no encontrado" });
        }

        // Verificar si el usuario es el autor del comentario
        if (comment.author.toString()!== author.toString()) {
            return res.status(403).send({ message: "No tienes permiso para eliminar este comentario" });
        }
        
        // Eliminar el comentario
        await comment.deleteOne();
        
        // Responder con un mensaje de éxito
        return res.status(200).send({ message: "Comentario eliminado correctamente" });
        
    } catch (error) {
        return res.status(500).send({ message: "Error al eliminar el comentario", error });
    }
  } 

  public static async deleteallComments(req: Request, res: Response) {
    const  user = req.user?._id;
    const { channel } = req.params;

    const channelComments = await Channel.findById(channel)

    if (!channelComments) {
        return res.status(404).send({ message: "Canal no encontrado" });
    }

    if (channelComments.user.toString() !== user.toString()) {
        return res.status(403).send({ message: "No tienes permiso para eliminar los comentarios de este canal" });
    }

    try {
        // Eliminar todos los comentarios
        await Comment.deleteMany();
        
        // Responder con un mensaje de éxito
        return res.status(200).send({ message: "Comentarios eliminados correctamente" });
        
    } catch (error) {
        return res.status(500).send({ message: "Error al eliminar los comentarios", error });
    }
  }
}
    
export default commentsController;

