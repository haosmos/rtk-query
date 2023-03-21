import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [ { type: 'Album', id: album.id } ];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [ { type: 'UsersAlbums', id: user.id } ];
        },
        query: (user) => {
          return {
            method: 'POST',
            url: '/albums',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            },
          };
        }
      }),
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map(
              album => {
                return {
                  type: 'Album',
                  id: album.id
                };
              }
          );
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            method: 'GET',
            url: '/albums',
            params: {
              userId: user.id
            }
          };
        }
      })
    };
  }
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation
} = albumsApi;
export { albumsApi };
