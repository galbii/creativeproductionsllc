import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

// ─── Sections ───────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    title: 'FPCAC Performances',
    slug: 'fpcac-performances',
    description:
      'Live musical performances by artists with the Fernando Pullum Community Arts Center Jazz Band',
    order: 1,
  },
  {
    title: 'FPCAC Events',
    slug: 'fpcac-events',
    description:
      'Annual galas, virtual fundraisers, and special events for the Fernando Pullum Community Arts Center',
    order: 2,
  },
  {
    title: 'Kawai',
    slug: 'kawai',
    description: 'Piano showcases, product features, and event highlights for Kawai',
    order: 3,
  },
  {
    title: 'Weddings',
    slug: 'weddings',
    description: 'Wedding films and celebration highlights',
    order: 4,
  },
  {
    title: 'Corporate & Events',
    slug: 'corporate-events',
    description: 'Corporate promos, event coverage, and commercial productions',
    order: 5,
  },
  {
    title: 'Real Estate',
    slug: 'real-estate',
    description: 'Real estate property showcase videos',
    order: 6,
  },
]

// ─── Videos ─────────────────────────────────────────────────────────────────
// section field references the slug above — resolved to an ID at runtime

const VIDEOS: {
  title: string
  url: string
  section: string
  description?: string
  order: number
}[] = [
  // ── FPCAC Performances ───────────────────────────────────────────────────
  {
    title: 'Fat and Greezy',
    url: 'https://vimeo.com/1023076998',
    section: 'fpcac-performances',
    description: 'Dedrick Bonner and James Tolbert with the FPCAC Jazz Band',
    order: 1,
  },
  {
    title: "I'm Going to Live Until I Die",
    url: 'https://vimeo.com/1023076948',
    section: 'fpcac-performances',
    description: 'Keith David and the FPCAC Jazz Band',
    order: 2,
  },
  {
    title: 'Nights',
    url: 'https://vimeo.com/1023076874',
    section: 'fpcac-performances',
    description: 'Sy Smith with the FPCAC Jazz Band',
    order: 3,
  },
  {
    title: 'Get Up',
    url: 'https://vimeo.com/1023076809',
    section: 'fpcac-performances',
    description: 'Sydney Elise with the FPCAC Jazz Band',
    order: 4,
  },
  {
    title: 'Now and Later',
    url: 'https://vimeo.com/1023076699',
    section: 'fpcac-performances',
    description: 'Sy Smith with the FPCAC Jazz Band',
    order: 5,
  },
  {
    title: 'She Zee Zee',
    url: 'https://vimeo.com/1023076609',
    section: 'fpcac-performances',
    description: 'Kevin and Michael Bacon perform with the FPCAC Jazz Band',
    order: 6,
  },
  {
    title: 'World in Motion',
    url: 'https://vimeo.com/1023076493',
    section: 'fpcac-performances',
    description: 'Jackson Browne with the FPCAC Jazz Band',
    order: 7,
  },
  {
    title: "A Man Ain't Supposed to Cry",
    url: 'https://vimeo.com/1023076382',
    section: 'fpcac-performances',
    description: 'Keith David and the FPCAC Jazz Band',
    order: 8,
  },
  {
    title: 'Beauty and the Beast',
    url: 'https://vimeo.com/871209788',
    section: 'fpcac-performances',
    order: 9,
  },
  {
    title: 'When the Saints Go Marching In',
    url: 'https://vimeo.com/871209387',
    section: 'fpcac-performances',
    order: 10,
  },
  {
    title: "Let's Stay Together",
    url: 'https://vimeo.com/869954504',
    section: 'fpcac-performances',
    order: 11,
  },
  {
    title: 'Daughters',
    url: 'https://vimeo.com/869207567',
    section: 'fpcac-performances',
    order: 12,
  },
  {
    title: 'Connections',
    url: 'https://vimeo.com/869205797',
    section: 'fpcac-performances',
    order: 13,
  },
  {
    title: 'Naima',
    url: 'https://vimeo.com/867755287',
    section: 'fpcac-performances',
    order: 14,
  },
  {
    title: 'Eve and Fernando Outro',
    url: 'https://vimeo.com/847817043',
    section: 'fpcac-performances',
    order: 15,
  },
  {
    title: 'Pullum Center',
    url: 'https://vimeo.com/868540633',
    section: 'fpcac-performances',
    order: 16,
  },
  {
    title: 'Running on Empty',
    url: 'https://vimeo.com/474876619',
    section: 'fpcac-performances',
    description: 'Jackson Browne and the Fernando Pullum Jazz Band',
    order: 17,
  },
  {
    title: 'On My Own',
    url: 'https://vimeo.com/471658553',
    section: 'fpcac-performances',
    description: 'Sy Smith, Michael McDonald and the Fernando Pullum Center Jazz Band',
    order: 18,
  },
  {
    title: 'Minute by Minute',
    url: 'https://vimeo.com/472424792',
    section: 'fpcac-performances',
    order: 19,
  },
  {
    title: 'Imagine',
    url: 'https://vimeo.com/476140388',
    section: 'fpcac-performances',
    order: 20,
  },
  {
    title: 'Doctor My Eyes',
    url: 'https://vimeo.com/474880516',
    section: 'fpcac-performances',
    order: 21,
  },
  {
    title: 'Fernando Pullum Jazz Band',
    url: 'https://vimeo.com/468827900',
    section: 'fpcac-performances',
    description: 'Fernando Pullum Jazz Band performs Soul Bossa Nova',
    order: 22,
  },
  {
    title: 'Hold On Tight',
    url: 'https://vimeo.com/653316892',
    section: 'fpcac-performances',
    description: 'Aloe Blacc',
    order: 23,
  },
  {
    title: "Maybe I'm Amazed",
    url: 'https://vimeo.com/653314076',
    section: 'fpcac-performances',
    order: 24,
  },
  {
    title: 'Brooklyn in the Summer',
    url: 'https://vimeo.com/653310963',
    section: 'fpcac-performances',
    description: 'Aloe Blacc',
    order: 25,
  },
  {
    title: 'Spotless Mind',
    url: 'https://vimeo.com/651331338',
    section: 'fpcac-performances',
    order: 26,
  },

  // ── FPCAC Events ─────────────────────────────────────────────────────────
  {
    title: '2024 FPCAC Virtual Gala',
    url: 'https://vimeo.com/1022566082',
    section: 'fpcac-events',
    order: 1,
  },
  {
    title: '2023 FPCAC Gala',
    url: 'https://vimeo.com/871311630',
    section: 'fpcac-events',
    order: 2,
  },
  {
    title: 'FPCAC Gala 2019',
    url: 'https://vimeo.com/333883301',
    section: 'fpcac-events',
    description: 'Fernando Pullum Community Arts Center 2nd Annual Gala, Los Angeles CA, May 1st 2019',
    order: 3,
  },
  {
    title: 'FPCAC Virtual Gala 2020',
    url: 'https://vimeo.com/476178996',
    section: 'fpcac-events',
    description: 'FPCAC Virtual Gala 2020',
    order: 4,
  },
  {
    title: 'FPCAC 1 Min Promo',
    url: 'https://vimeo.com/397834222',
    section: 'fpcac-events',
    order: 5,
  },

  // ── Kawai ────────────────────────────────────────────────────────────────
  {
    title: 'Kawai Piano Gallery Dallas',
    url: 'https://vimeo.com/889467930',
    section: 'kawai',
    order: 1,
  },
  {
    title: 'Kawai Piano Gallery Houston',
    url: 'https://vimeo.com/889467519',
    section: 'kawai',
    order: 2,
  },
  {
    title: 'AyseDeniz at Summit LA',
    url: 'https://vimeo.com/372037429',
    section: 'kawai',
    description: 'AyseDeniz performs at SummitLA 2019 for Kawai Piano',
    order: 3,
  },
  {
    title: 'Kawai GL GX — AyseDeniz',
    url: 'https://vimeo.com/698837089',
    section: 'kawai',
    order: 4,
  },
  {
    title: 'Kawai NAMM Show 2017',
    url: 'https://vimeo.com/201436542',
    section: 'kawai',
    description: 'Quick highlights of the Kawai booth at the NAMM Show 2017',
    order: 5,
  },
  {
    title: "Kawai America Corp's NAMM Reception Highlights",
    url: 'https://vimeo.com/389748837',
    section: 'kawai',
    description: 'Same day edit',
    order: 6,
  },
  {
    title: '5 Reasons to Buy Kawai',
    url: 'https://vimeo.com/504151556',
    section: 'kawai',
    order: 7,
  },
  {
    title: 'Kawai Celebrates Chinese New Year',
    url: 'https://vimeo.com/504088826',
    section: 'kawai',
    order: 8,
  },
  {
    title: "Brian Chung's Disney Medley",
    url: 'https://vimeo.com/266005945',
    section: 'kawai',
    order: 9,
  },

  // ── Weddings ─────────────────────────────────────────────────────────────
  {
    title: 'Constance & Jared',
    url: 'https://vimeo.com/389538581',
    section: 'weddings',
    description: "Constance and Jared's wedding at the Newhall Mansion — Same day video edit",
    order: 1,
  },
  {
    title: 'NIkka & Brandon',
    url: 'https://vimeo.com/378090823',
    section: 'weddings',
    order: 2,
  },
  {
    title: 'Kristine & Mark',
    url: 'https://vimeo.com/364454410',
    section: 'weddings',
    description: 'Same day edit shot on DJI Pocket and DJI Spark',
    order: 3,
  },
  {
    title: 'Darlene & Carlos',
    url: 'https://vimeo.com/347020712',
    section: 'weddings',
    description: 'The Orchard by Wedgewood Weddings, Menifee CA — Next Day Edit',
    order: 4,
  },
  {
    title: 'Tina and Clifford',
    url: 'https://vimeo.com/219478871',
    section: 'weddings',
    description: "Tina and Clifford's Wedding at Los Coyotes Country Club and Mon Amour",
    order: 5,
  },
  {
    title: 'Rocio & Julian',
    url: 'https://vimeo.com/239767372',
    section: 'weddings',
    description: "Rocio & Julian's wedding highlights",
    order: 6,
  },
  {
    title: 'David & Kevin — Wedding',
    url: 'https://vimeo.com/237472809',
    section: 'weddings',
    description: 'David and Kevin Wedding at The Palm Springs Air Museum',
    order: 7,
  },
  {
    title: 'David & Kevin — Reception',
    url: 'https://vimeo.com/239758269',
    section: 'weddings',
    description: "David & Kevin's Reception",
    order: 8,
  },
  {
    title: 'Allan & Marjorie',
    url: 'https://vimeo.com/210177709',
    section: 'weddings',
    description: 'Same day edit',
    order: 9,
  },
  {
    title: 'Sindy & Jeff',
    url: 'https://vimeo.com/176118414',
    section: 'weddings',
    description: 'Wedding & Reception: Queen Mary, Long Beach, CA — Same Day edit',
    order: 10,
  },
  {
    title: 'Jessica and Andy',
    url: 'https://vimeo.com/174121181',
    section: 'weddings',
    description: 'Wedding & Reception: Walnut Grove, Moorpark, California',
    order: 11,
  },
  {
    title: 'Yatsy & Ryan',
    url: 'https://vimeo.com/174072325',
    section: 'weddings',
    description: 'Wedding & Reception: Europa Village, Temecula, California — Same Day edit',
    order: 12,
  },

  // ── Corporate & Events ───────────────────────────────────────────────────
  {
    title: 'Long Beach Bulldog Meetup',
    url: 'https://vimeo.com/713139613',
    section: 'corporate-events',
    description: 'Without a Warning feat Gabby Jones — May 2022',
    order: 1,
  },
  {
    title: "Kelis's Graduation",
    url: 'https://vimeo.com/429438025',
    section: 'corporate-events',
    description: "Kelis Chan's Graduation Drive By",
    order: 2,
  },
  {
    title: 'Celestial Freight Solutions',
    url: 'https://vimeo.com/404091468',
    section: 'corporate-events',
    order: 3,
  },
  {
    title: 'BBGLOW',
    url: 'https://vimeo.com/396580009',
    section: 'corporate-events',
    order: 4,
  },
  {
    title: 'SXS Special Olympics Photo Shoot',
    url: 'https://vimeo.com/393348225',
    section: 'corporate-events',
    description: 'Beachside Shoot Fundraiser for the Special Olympics at Huntington Beach California — Same Day Edit',
    order: 5,
  },
  {
    title: 'CCU/SDU Jingle & Mingle',
    url: 'https://vimeo.com/378379308',
    section: 'corporate-events',
    order: 6,
  },
  {
    title: 'Crowd Control Entertainment',
    url: 'https://vimeo.com/376989065',
    section: 'corporate-events',
    order: 7,
  },
  {
    title: 'Ford Center',
    url: 'https://vimeo.com/334470778',
    section: 'corporate-events',
    order: 8,
  },
  {
    title: '2018 Cambodian New Year After Party',
    url: 'https://vimeo.com/266047141',
    section: 'corporate-events',
    description:
      "Mass Productions & Social Networth along with Doing The Most Entertainment presents the Official 2018 Cambodian New Year After Party TLC Celebration at Ciricello's in Long Beach, CA",
    order: 9,
  },
  {
    title: 'Winter Formal 2018',
    url: 'https://vimeo.com/251098437',
    section: 'corporate-events',
    order: 10,
  },
  {
    title: 'The Water Strider by Drone Rafts',
    url: 'https://vimeo.com/187286141',
    section: 'corporate-events',
    description: 'Zac Cole discusses the testing of the Water Strider by Drone Rafts',
    order: 11,
  },
  {
    title: 'Charlie Dog',
    url: 'https://vimeo.com/184275061',
    section: 'corporate-events',
    description: 'Drone footage — Same day edit',
    order: 12,
  },
  {
    title: 'Low Life',
    url: 'https://vimeo.com/184269852',
    section: 'corporate-events',
    description: 'Drone footage — Same day edit',
    order: 13,
  },

  // ── Real Estate ──────────────────────────────────────────────────────────
  {
    title: '4655 Falcon Ave',
    url: 'https://vimeo.com/216267244',
    section: 'real-estate',
    description: 'Real Estate',
    order: 1,
  },
  {
    title: '1242 E 56th St Long Beach',
    url: 'https://vimeo.com/174071973',
    section: 'real-estate',
    description: 'Real Estate Video',
    order: 2,
  },
  {
    title: '1032 S Mesa San Pedro',
    url: 'https://vimeo.com/174071929',
    section: 'real-estate',
    description: 'Real Estate Video',
    order: 3,
  },
]

// ─── Seed ────────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...\n')

  // 1. Seed sections
  console.log('📁 Seeding gallery sections...')
  const sectionIdMap: Record<string, string> = {}

  for (const section of SECTIONS) {
    const existing = await payload.find({
      collection: 'gallery-sections',
      where: { slug: { equals: section.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      sectionIdMap[section.slug] = doc.id as string
      console.log(`  ⏭  Skipped (exists): ${section.title}`)
    } else {
      const created = await payload.create({
        collection: 'gallery-sections',
        data: {
          title: section.title,
          slug: section.slug,
          description: section.description,
          order: section.order,
          contentType: 'video',
          isVisible: true,
        },
      })
      sectionIdMap[section.slug] = created.id as string
      console.log(`  ✅ Created: ${section.title}`)
    }
  }

  console.log(`\n🎬 Seeding gallery videos...`)
  let created = 0
  let skipped = 0

  for (const video of VIDEOS) {
    const sectionId = sectionIdMap[video.section]
    if (!sectionId) {
      console.warn(`  ⚠️  No section ID found for slug "${video.section}" — skipping "${video.title}"`)
      continue
    }

    const existing = await payload.find({
      collection: 'gallery-videos',
      where: { videoUrl: { equals: video.url } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    await payload.create({
      collection: 'gallery-videos',
      data: {
        title: video.title,
        videoUrl: video.url,
        videoType: 'vimeo',
        section: sectionId,
        description: video.description,
        order: video.order,
        isFeatured: false,
        isVisible: true,
      },
    })
    created++
    console.log(`  ✅ ${video.title}`)
  }

  console.log(`\n✨ Done! Created ${created} videos, skipped ${skipped} (already existed).`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
