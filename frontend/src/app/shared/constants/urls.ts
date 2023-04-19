const BASE_URL = 'http://34.130.196.174/';
// const API_BASE_URL = 'http://localhost:3000/' 

export const MOVIES_URL = BASE_URL + 'api/movies';

export const ALL_MOVIES_URL = BASE_URL + 'api/imdb';
export const ALL_TV_SHOW_URL = BASE_URL + 'api/imdb/tv';
export const LATEST_MOVIES_URL = BASE_URL + 'api/imdb/latest';
export const MOVIES_BY_SEARCH_URL = BASE_URL + 'api/imdb/search?query=';
export const TVSHOW_BY_SEARCH_URL = BASE_URL + 'api/imdb/tv/search?query=';
export const ALL_GENRES = ALL_MOVIES_URL + '/genres';
export const MOVIES_TAGS_URL = MOVIES_URL + '/tags';
export const MOVIES_BY_TAG_URL = MOVIES_URL + '/tag/';
export const MOVIES_BY_ID_URL = MOVIES_URL + '/';
export const API_MOVIES_BY_ID_URL = BASE_URL + 'api/imdb/movie/';
export const API_TVSHOW_BY_ID_URL = BASE_URL + 'api/imdb/tv/';
export const GET_ALL_SAVED_CONTENT = BASE_URL + 'api/content/';


export const USER_LOGIN_URL = BASE_URL + 'api/users/login';
export const USER_REGISTER_URL = BASE_URL + 'api/users/register';

export const REVIEW_URL = BASE_URL + 'api/reviews/list/';
export const REVIEW_ADD_URL = BASE_URL + 'api/reviews/add';
export const REVIEW_DELETE_URL = BASE_URL + 'api/reviews/delete/';