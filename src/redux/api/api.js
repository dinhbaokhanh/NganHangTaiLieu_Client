import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config.js";

// Base query gốc
const baseQuery = fetchBaseQuery({
  baseUrl: `${server}/api/`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Base query với khả năng tự refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/user/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data?.accessToken) {
      localStorage.setItem("token", refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Refresh token failed");
    }
  }

  return result;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Document", "User", "Subject"],

  endpoints: (builder) => ({
    // --- USER ---
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        body: formData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, token, password, confirmPassword }) => ({
        url: `/user/reset-password/${id}/${token}`,
        method: "POST",
        body: { password, confirmPassword },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (formData) => ({
        url: "/user/add",
        method: "POST",
        body: formData,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getUserProfile: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
    }),

    // --- DOCUMENT ---
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/document/upload",
        method: "POST",
        body: formData,
      }),
    }),
    getAllDocument: builder.query({
      query: () => ({
        url: "/document/",
        method: "GET",
      }),
    }),
    updateDocument: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/document/${id}`, // PUT /document/:id
        method: "PUT",
        body: updatedData,
      }),
    }),
    replaceDocument: builder.mutation({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/document/replace/${id}`, // PUT /document/replace/:id
          method: "PUT",
          body: formData,
        };
      },
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/document/${id}`, // DELETE /document/:id
        method: "DELETE",
      }),
    }),

    // --- SUBJECT ---
    createSubject: builder.mutation({
      query: (subjectData) => ({
        url: "/subject/create",
        method: "POST",
        body: subjectData,
      }),
    }),
    getAllSubjects: builder.query({
      query: () => ({
        url: "/subject",
        method: "GET",
      }),
    }),
    getSubjectById: builder.query({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "GET",
      }),
    }),
    updateSubjectById: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/subject/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteSubjectById: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default api;

export const {
  // User
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAddUserMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,

  // Document
  useUploadDocumentMutation,
  useGetAllDocumentQuery,
  useUpdateDocumentMutation,
  useReplaceDocumentMutation,
  useDeleteDocumentMutation,

  // Subject
  useCreateSubjectMutation,
  useGetAllSubjectsQuery,
  useGetSubjectByIdQuery,
  useUpdateSubjectByIdMutation,
  useDeleteSubjectByIdMutation,
} = api;
