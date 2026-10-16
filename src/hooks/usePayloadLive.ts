import { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { 
  CMS_URL, 
  populateMediaCache, 
  getMtscTorontoHomePageData, 
  getMtscTorontoAboutPageData, 
  getMtscTorontoSupportPageData, 
  getMtscTorontoGetInvolvedPageData, 
  getMtscTorontoContactPageData, 
  getMtscTorontoFooterData, 
  getMtscTorontoHeaderData ,
  getMtscTorontoEventsPageData
} from '../services/api';

export const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

export function isValidCmsData(d: any) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return false;
  return Boolean(
    d.id ||
    d.globalType ||
    d.slug ||
    d.hero_eyebrow ||
    d.hero_title ||
    d.hero_title_lead ||
    d.help_title ||
    d.haircut_title ||
    d.network_title ||
    d.station_title ||
    d.brand_title
  );
}

export function getStorageCache(key: string) {
  try {
    const raw = localStorage.getItem(`mtsctoronto_data_v1_${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidCmsData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setStorageCache(key: string, data: any) {
  if (!isValidCmsData(data)) return;
  try {
    localStorage.setItem(`mtsctoronto_data_v1_${key}`, JSON.stringify(data));
  } catch {}
}

function getBestData(postMessageData: any, liveData: any, initialData: any, lastValidRef: any, cacheKey: string) {
  if (isInIframe) {
    const merged = {
      ...(isValidCmsData(initialData) ? initialData : {}),
      ...(isValidCmsData(liveData) ? liveData : {}),
      ...(isValidCmsData(postMessageData) ? postMessageData : {}),
    };
    if (isValidCmsData(merged)) {
      lastValidRef.current = merged;
      setStorageCache(cacheKey, merged);
      return merged;
    }
  }
  if (isValidCmsData(initialData)) {
    lastValidRef.current = initialData;
    setStorageCache(cacheKey, initialData);
    return initialData;
  }
  if (isValidCmsData(lastValidRef.current)) {
    return lastValidRef.current;
  }
  return getStorageCache(cacheKey);
}

// 1. HOME PAGE
export function useMtscTorontoHomePageLive() {
  const cacheKey = 'mtsc-toronto-home-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-home-page-data'],
    queryFn: getMtscTorontoHomePageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-home-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-home-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 2. ABOUT PAGE
export function useMtscTorontoAboutPageLive() {
  const cacheKey = 'mtsc-toronto-about-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-about-page-data'],
    queryFn: getMtscTorontoAboutPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-about-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-about-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 3. SUPPORT PAGE
export function useMtscTorontoSupportPageLive() {
  const cacheKey = 'mtsc-toronto-support-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-support-page-data'],
    queryFn: getMtscTorontoSupportPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-support-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-support-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 4. GET INVOLVED PAGE
export function useMtscTorontoGetInvolvedPageLive() {
  const cacheKey = 'mtsc-toronto-get-involved-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-get-involved-page-data'],
    queryFn: getMtscTorontoGetInvolvedPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-get-involved-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-get-involved-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 5. CONTACT PAGE
export function useMtscTorontoContactPageLive() {
  const cacheKey = 'mtsc-toronto-contact-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-contact-page-data'],
    queryFn: getMtscTorontoContactPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-contact-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-contact-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 6. FOOTER
export function useMtscTorontoFooterLive() {
  const cacheKey = 'mtsc-toronto-footer';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-footer-data'],
    queryFn: getMtscTorontoFooterData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-footer' ||
        event?.data?.globalSlug === 'mtsc-toronto-footer'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

// 7. HEADER
export function useMtscTorontoHeaderLive() {
  const cacheKey = 'mtsc-toronto-header';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-header-data'],
    queryFn: getMtscTorontoHeaderData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-header' ||
        event?.data?.globalSlug === 'mtsc-toronto-header'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}

export function useMtscTorontoEventsPageLive() {
  const cacheKey = 'mtsc-toronto-events-page';
  const lastValidRef = useRef(getStorageCache(cacheKey));
  const [mediaCacheTick, setMediaCacheTick] = useState(0);

  useEffect(() => {
    const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
    window.addEventListener('payload-media-cached', handleMediaCached);
    return () => window.removeEventListener('payload-media-cached', handleMediaCached);
  }, []);

  const { data: initialData, isLoading, error, refetch } = useQuery({
    queryKey: ['mtsc-toronto-events-page-data'],
    queryFn: getMtscTorontoEventsPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData);
    }
  }, [initialData]);

  const effectiveServerURL = useMemo(() => {
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const refOrigin = new URL(document.referrer).origin;
        if (refOrigin && refOrigin !== 'null') return refOrigin;
      } catch {}
    }
    return CMS_URL;
  }, []);

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current || {},
    serverURL: effectiveServerURL,
    depth: 2,
  });

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData);
    }
  }, [liveData]);

  const [postMessageData, setPostMessageData] = useState<any>(null);

  useEffect(() => {
    if (!isInIframe) return;
    const handleMessage = (event: any) => {
      if (
        event?.data?.type === 'payload-document-event' ||
        (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
      ) {
        refetch();
        setTimeout(() => refetch(), 350);
        return;
      }
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-toronto-events-page' ||
        event?.data?.globalSlug === 'mtsc-toronto-events-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data;
        if (payloadData && typeof payloadData === 'object') {
          populateMediaCache(payloadData);
          setPostMessageData((prev: any) => ({ ...(prev || {}), ...payloadData }));
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetch]);

  const activeData = useMemo(() => {
    const best = getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey);
    return best ? { ...best } : best;
  }, [postMessageData, liveData, initialData, mediaCacheTick]);

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData) && isLoading,
    error,
    refetch,
  };
}