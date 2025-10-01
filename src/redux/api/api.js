import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    adminSignup: builder.mutation({
      query: (data) => ({
        url: "/admin/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getAdmins: builder.query({
      query: () => ({
        url: "/admin/all",
      }),
      providesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),

    //donation endpoints
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/donation/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/donation/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    paymentFailed: builder.mutation({
      query: (data) => ({
        url: "/donation/failed",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    allDonations: builder.query({
      query: () => ({
        url: "/donation/all",
      }),
      providesTags: ["Admin"],
    }),
    getDonationReceipt: builder.query({
      query: (id) => ({
        url: `/donation/${id}/receipt`,
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          // create hidden link & auto click
          const a = document.createElement("a");
          a.href = url;
          a.download =
            response.headers
              .get("Content-Disposition")
              ?.split("filename=")[1] || "receipt.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          return { success: true };
        },
      }),
    }),

    //member endpoints
    createMemberOrder: builder.mutation({
      query: (data) => ({
        url: "/member/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    verifyMemberPayment: builder.mutation({
      query: (data) => ({
        url: "/member/verify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    allMembers: builder.query({
      query: () => ({
        url: "/member/all",
      }),
      providesTags: ["Admin"],
    }),
    updateMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/member/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    generateIdCard: builder.mutation({
      query: (id) => ({
        url: `/member/${id}/idcard`,
        method: "GET",
      }),
    }),
    getMembers: builder.query({
      query: () => ({
        url: "/member",
      }),
      providesTags: ["Admin"],
    }),

    //event endpoints
    newEvent: builder.mutation({
      query: (data) => ({
        url: "/event/new",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    allEvents: builder.query({
      query: () => ({
        url: "/event/all",
      }),
      providesTags: ["Admin"],
    }),
    getSingleEvent: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
      }),
      providesTags: ["Admin"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/event/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    //gallery endpoints
    newPhoto: builder.mutation({
      query: (data) => ({
        url: "/admin/gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    deletePhoto: builder.mutation({
      query: (id) => ({
        url: `/admin/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    allGalleryPhotos: builder.query({
      query: () => ({
        url: "/admin/gallery",
      }),
      providesTags: ["Admin"],
    }),

    //dashboard endpoint
    dashboardStats: builder.query({
      query: () => ({
        url: "/admin/stats",
      }),
      providesTags: ["Admin"],
    }),

    //team management endpoints
    addTeamMember: builder.mutation({
      query: (data) => ({
        url: "/admin/team",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    allTeamMembers: builder.query({
      query: () => ({
        url: "/admin/team",
      }),
      providesTags: ["Admin"],
    }),
    singleTeamMember: builder.query({
      query: (id) => ({
        url: `/admin/team/${id}`,
      }),
      providesTags: ["Admin"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/admin/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export default api;
export const {
  useGetAdminsQuery,
  useAdminSignupMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  usePaymentFailedMutation,
  useAllDonationsQuery,
  useLazyGetDonationReceiptQuery,
  useCreateMemberOrderMutation,
  useVerifyMemberPaymentMutation,
  useAllMembersQuery,
  useUpdateMemberMutation,
  useAllEventsQuery,
  useNewEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetSingleEventQuery,
  useAllGalleryPhotosQuery,
  useDeletePhotoMutation,
  useNewPhotoMutation,
  useGenerateIdCardMutation,
  useGetMembersQuery,
  useDashboardStatsQuery,
  useAddTeamMemberMutation,
  useAllTeamMembersQuery,
  useSingleTeamMemberQuery,
  useDeleteTeamMemberMutation,
} = api;
