import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.beeseek.site'
  
  // Service categories for dynamic pages
  const serviceCategories = [
    'electrician',
    'plumber',
    'ac-repair',
    'carpenter',
    'painter',
    'cleaning-services',
    'house-cleaning',
    'deep-cleaning',
    'laundry-services',
    'phone-repair',
    'laptop-repair',
    'event-planning',
    'catering',
    'photography',
    'barber',
    'hairdressing',
    'makeup-artist',
    'gardening',
    'pest-control'
  ]
  
  // Nigerian cities we serve
  const cities = [
    'lagos',
    'ibadan',
    'abuja',
    'port-harcourt'
  ]
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]
  
  // Generate service category pages
  const servicePagesFromCategories = serviceCategories.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  
  // Generate location-based service pages (service + city combinations)
  const locationServicePages = cities.flatMap((city) =>
    serviceCategories.map((service) => ({
      url: `${baseUrl}/services/${service}/${city}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  )
  
  // Generate city pages
  const cityPages = cities.map((city) => ({
    url: `${baseUrl}/cities/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
 
  return [
    ...staticPages,
    ...servicePagesFromCategories,
    ...cityPages,
    ...locationServicePages,
  ]
}
