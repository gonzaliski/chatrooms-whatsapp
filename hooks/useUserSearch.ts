// src/hooks/useUserSearch.js
import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { userSelector } from "@/redux/selectors";
import { useSelector } from "react-redux";

export const useUserSearch = (searchQuery: string) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const { id } = useSelector(userSelector);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setSearchError("");

      try {
        const result = await userService.searchUsers(searchQuery, id);
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
