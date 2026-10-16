export const CMS_URL = (import.meta.env.VITE_CMS_URL || 'https://mtsc-toronto-cms.cloudgenz.com').replace(/\/+$/, '');

const mediaCacheMap = new Map<string, any>();

export function populateMediaCache(data: any) {
  if (!data) return;
  if (Array.isArray(data)) {
    data.forEach((item) => populateMediaCache(item));
  } else if (typeof data === 'object' && data !== null) {
    if (data.id && data.url) {
      mediaCacheMap.set(String(data.id), data);
    }
    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        populateMediaCache(data[key]);
      }
    }
  }
}

/**
 * Fetch MTSC Toronto HomePage Global data from Payload CMS
 */
export async function getMtscTorontoHomePageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-home-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto home page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto HomePage from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto AboutPage Global data from Payload CMS
 */
export async function getMtscTorontoAboutPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-about-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto about page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto AboutPage from Payload:', error);
    return null;
  }
}

/**
 * Universal Media URL Resolver
 */
export function getMediaUrl(mediaObj: any, fallbackUrl: string | null = null): string | null {
  if (!mediaObj) return fallbackUrl;

  const formatUrl = (rawUrl: string) => {
    if (!rawUrl || typeof rawUrl !== 'string') return fallbackUrl;
    let cleanUrl = rawUrl;
    if (cleanUrl.includes('localhost:4000') || cleanUrl.includes('localhost:3000')) {
      cleanUrl = cleanUrl.replace(/^http:\/\/localhost:(4000|3000)/, CMS_URL);
    }
    if (cleanUrl.startsWith('http') || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:')) {
      return cleanUrl;
    }
    return `${CMS_URL}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
  };

  if (typeof mediaObj === 'object' && mediaObj !== null) {
    if (mediaObj.id && mediaObj.url) mediaCacheMap.set(String(mediaObj.id), mediaObj);
    if (mediaObj.url) return formatUrl(mediaObj.url);
    if (mediaObj.filename) return `${CMS_URL}/api/media/file/${mediaObj.filename}`;
    if (mediaObj.id) mediaObj = mediaObj.id;
  }

  const strId = String(mediaObj);
  if (mediaCacheMap.has(strId)) {
    const cached = mediaCacheMap.get(strId);
    if (cached?.url) return formatUrl(cached.url);
    if (cached?.filename) return `${CMS_URL}/api/media/file/${cached.filename}`;
  }

  if (typeof mediaObj === 'string' && !/^\d+$/.test(mediaObj) && !/^[a-f\d]{24}$/i.test(mediaObj)) {
    return formatUrl(mediaObj);
  }

  return fallbackUrl;
}

/**
 * Fetch MTSC Toronto SupportPage Global data from Payload CMS
 */
export async function getMtscTorontoSupportPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-support-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto support page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto SupportPage from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto GetInvolvedPage Global data from Payload CMS
 */
export async function getMtscTorontoGetInvolvedPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-get-involved-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto get-involved page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto GetInvolvedPage from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto ContactPage Global data from Payload CMS
 */
export async function getMtscTorontoContactPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-contact-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto contact page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto ContactPage from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto Footer Global data from Payload CMS
 */
export async function getMtscTorontoFooterData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-footer?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto footer: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto Footer from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto Header Global data from Payload CMS
 */
export async function getMtscTorontoHeaderData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-header?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto header: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto Header from Payload:', error);
    return null;
  }
}

/**
 * Fetch MTSC Toronto EventsPage Global data from Payload CMS
 */
export async function getMtscTorontoEventsPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/mtsc-toronto-events-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch MTSC Toronto events page: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching MTSC Toronto EventsPage from Payload:', error);
    return null;
  }
}