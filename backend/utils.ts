import * as expressApp from './app';

export const movieType: string = 'movie';
export const tvType: string = 'tv';
export const personType: string = 'person';

export const actingDepartment: string = 'Acting';
export const directingDepartment: string = 'Directing';
export const creatorDepartment: string = 'Creator';
export const writingDepartment: string = 'Writing';
export const productionDepartment: string = 'Production';

export const genericPlaceholderImage: string = 'placeholder-generic.png';
export const portraitPlaceholderImage: string = 'placeholder-portrait.png';

export let imageConfig = {
  baseUrl: 'https://image.tmdb.org/t/p/',
  backDropSize: 'w1280',
  logoSize: 'w92',
  posterSize: 'w500',
  profileSize: 'h632',
  stillSize: 'w300',
};

export const getFormattedRuntime = (
  runtime: number | undefined
): string | null => {
  if (!runtime) {
    return null;
  }

  if (runtime < 60) {
    return runtime.toString() + 'm';
  }

  const time: Date = new Date(Date.UTC(0, 0, 0, 0, runtime, 0, 0));
  const hours: number = time.getUTCHours();
  const minutes: number = time.getUTCMinutes();

  if (!hours) {
    return minutes.toString() + 'm';
  }

  if (!minutes) {
    return hours.toString() + 'h';
  }

  return hours.toString() + 'h ' + minutes.toString() + 'm';
};

export const getImageConfig = async (): Promise<void> => {
  try {
    const movieDbResponse = await expressApp.moviedb.configuration();

    if (movieDbResponse.images) {
      const images = movieDbResponse.images;

      if (images.secure_base_url) {
        imageConfig.baseUrl = images.secure_base_url;
      }

      imageConfig.backDropSize = getImageSize(
        imageConfig.backDropSize,
        images.backdrop_sizes
      );
      imageConfig.logoSize = getImageSize(
        imageConfig.logoSize,
        images.logo_sizes
      );
      imageConfig.posterSize = getImageSize(
        imageConfig.posterSize,
        images.poster_sizes
      );
      imageConfig.profileSize = getImageSize(
        imageConfig.profileSize,
        images.profile_sizes
      );
      imageConfig.stillSize = getImageSize(
        imageConfig.stillSize,
        images.still_sizes
      );
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const getImageSize = (
  idealSize: string,
  availableSizes: string[] | undefined
): string => {
  if (availableSizes && availableSizes.length) {
    let foundIdealSize: boolean = false;
    let largestSize: string = availableSizes[0];

    availableSizes.every((size: string) => {
      if (size === idealSize) {
        foundIdealSize = true;
        return false;
      }

      if (size[0] != 'h' && size[0] != 'w') {
        return false;
      }

      largestSize = size;
      return true;
    });

    return foundIdealSize ? idealSize : largestSize;
  }

  return idealSize;
};

export const getImageUrl = (
  type: string | null | undefined = null,
  posterPath: string | null | undefined = null,
  profilePath: string | null | undefined = null,
  customSize: string | null = null
): string | null => {
  const baseUrl: string = imageConfig.baseUrl;

  if (posterPath) {
    return baseUrl + (customSize || imageConfig.posterSize) + posterPath;
  }

  if (profilePath) {
    return baseUrl + (customSize || imageConfig.profileSize) + profilePath;
  }

  return (
    expressApp.staticImagesUrl +
    '/' +
    (type === personType ? portraitPlaceholderImage : genericPlaceholderImage)
  );
};

export const getJobFromDepartment = (
  department: string | undefined,
  gender: number | undefined = undefined
): string | undefined => {
  const femaleGender: number = 1;

  switch (department) {
    case actingDepartment:
      return gender === femaleGender ? 'Actress' : 'Actor';
    case directingDepartment:
      return 'Director';
    case creatorDepartment:
      return 'Creator';
    case writingDepartment:
      return 'Writer';
    case productionDepartment:
      return 'Producer';
  }
  
  if (department?.length) {
    return department + ' Department';
  }

  return department;
};
