

import { Request, Response } from 'express';
import Comment from '../Data/models/comments';
import Channel from '../Data/models/chanel';

class commentsController {

    public static async getComments(req: Request, res: Response) {
        const { channelId } = req.params;
        try {
            const channel = await Channel.findById(channelId).populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            });

            if (!channel) {
                return res.status(404).send({ message: "Canal no encontrado" });
            }

            return res.send({ msg: "Comentarios obtenidos correctamente", comments: channel.comments });
        } catch (error) {
            return res.status(500).send({ message: "Error al obtener los comentarios", error });
        }
    }

    public static async createComment(req: Request, res: Response) {
        const author = req.user?._id;
        try {
            const { content, channel } = req.body;
            const newComment = new Comment({ content, channel, author });
            await newComment.save();

            // Agregar el comentario al arreglo de comentarios del canal
            await Channel.findByIdAndUpdate(channel, {
                $push: { comments: newComment._id }
            });

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
            const comment = await Comment.findById(id);

            if (!comment) {
                return res.status(404).send({ message: "Comentario no encontrado" });
            }

            if (comment.author.toString() !== author?.toString()) {
                return res.status(403).send({ message: "No tienes permiso para actualizar este comentario" });
            }

            comment.content = content;
            await comment.save();

            return res.status(200).send({ message: "Comentario actualizado correctamente", comment });

        } catch (error) {
            res.status(500).send({ message: "Error al actualizar el comentario", error });
        }
    }

    public static async deleteComment(req: Request, res: Response) {
        const author = req.user?._id;
        const { id } = req.params;

        try {
            const comment = await Comment.findById(id);

            if (!comment) {
                return res.status(404).send({ message: "Comentario no encontrado" });
            }

            if (comment.author.toString() !== author?.toString()) {
                return res.status(403).send({ message: "No tienes permiso para eliminar este comentario" });
            }

            // Eliminar la referencia del comentario en el canal
            await Channel.findByIdAndUpdate(comment.channel, {
                $pull: { comments: comment._id }
            });

            // Eliminar el comentario
            await comment.deleteOne();

            return res.status(200).send({ message: "Comentario eliminado correctamente" });

        } catch (error) {
            return res.status(500).send({ message: "Error al eliminar el comentario", error });
        }
    }

    public static async deleteAllComments(req: Request, res: Response) {
        const user = req.user?._id;
        const { channel } = req.params;

        try {
            const channelData = await Channel.findById(channel);

            if (!channelData) {
                return res.status(404).send({ message: "Canal no encontrado" });
            }

            if (channelData.user.toString() !== user?.toString()) {
                return res.status(403).send({ message: "No tienes permiso para eliminar los comentarios de este canal" });
            }

            // Eliminar todos los comentarios asociados al canal
            await Comment.deleteMany({ channel: channel });

            // Vaciar el arreglo de comentarios del canal
            channelData.comments = [];
            await channelData.save();

            return res.status(200).send({ message: "Comentarios eliminados correctamente" });

        } catch (error) {
            return res.status(500).send({ message: "Error al eliminar los comentarios", error });
        }
    }
}

export default commentsController;
