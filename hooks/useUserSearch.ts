// src/hooks/useUserSearch.js
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export const useUserSearch = (searchQuery: string) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery.trim() === "") {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setSearchError("");

      try {
        const result = await userService.searchUsers(searchQuery);

        setUsers(result);
      } catch (error) {
        setSearchError("Hubo un error al buscar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return { users, loading, searchError };
};
