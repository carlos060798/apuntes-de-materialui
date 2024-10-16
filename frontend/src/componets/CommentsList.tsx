import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, createComment, deleteComment, updateComment } from "../api/comment.api";
import Loader from "./Loader";

interface CommentSectionProps {
  channelId: string;
}

function CommentSection({ channelId }: CommentSectionProps) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");

  // Obtener el username del usuario logueado
  const currentUsername = localStorage.getItem("username");
  console.log(currentUsername);

  const { data: commentsData, isLoading: isLoadingComments, error: commentsError } = useQuery({
    queryKey: ["comments", channelId],
    queryFn: () => getComments(channelId),
    enabled: !!channelId,
  });

  const createCommentMutation = useMutation({
    mutationFn: (commentData: { content: string; channelId: string }) => createComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", channelId]);
      setNewComment(""); // Limpiar campo de comentario después de agregarlo
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", channelId]);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      updateComment({ commentId, commentData: { content } }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", channelId]);
      setEditingCommentId(null); // Limpiar el estado de edición después de la actualización
      setEditedContent("");
    },
  });

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      createCommentMutation.mutate({ content: newComment, channelId });
    }
  };

  const handleUpdateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim() && editingCommentId) {
      updateCommentMutation.mutate({ commentId: editingCommentId, content: editedContent });
    }
  };

  if (isLoadingComments) return <Loader />;
  if (commentsError) return <p>Error al cargar los comentarios.</p>;

  return (
    <div className="comment-section mt-4 p-3 rounded shadow-sm bg-light">
      <h5 className="text-primary">Comentarios</h5>
      <ul className="list-group mb-3">
        {commentsData?.comments.map((comment: any) => (
          <li key={comment._id} className="list-group-item border-0 mb-3 p-3 shadow-sm rounded bg-white">
            <div className="row">
              <div className="col-auto">
                <img
                  src={comment.author.avatar || "https://via.placeholder.com/50"}
                  alt={comment.author.username}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <div className="col">
                <strong className="text-dark">{comment.author.username}</strong>
                <p className="mb-1 text-muted small">{new Date(comment.createdAt).toLocaleString()}</p>
                <div className="mb-2">
                  {editingCommentId === comment._id ? (
                    <form onSubmit={handleUpdateComment}>
                      <textarea
                        className="form-control"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <div className="mt-2">
                        <button type="submit" className="btn btn-primary btn-sm me-2">Guardar</button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </div>
              </div>

              {/* Mostrar los botones solo si el usuario es el dueño del comentario */}
              {currentUsername === comment.author.username && editingCommentId !== comment._id && (
                <div className="col-auto d-flex align-items-center">
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditedContent(comment.content);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCommentMutation.mutate(comment._id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario para agregar nuevo comentario */}
      <form onSubmit={handleCreateComment} className="mt-4">
        <div className="form-group">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2 w-100">
          Comentar
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
