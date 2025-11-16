import * as kv from "./kv_store.tsx";

// Seed data for initial converter pages
export const seedConverters = [
  {
    id: 'length-converter-001',
    title: 'Length Unit Converter',
    slug: 'length-converter',
    category: 'Digital Tools',
    subcategory: 'length-unit-converter',
    subcategory_display_name: 'Length Unit Converter',
    default_from_unit: 'Meter',
    default_to_unit: 'Foot',
    description: 'Convert between length units instantly. Support for meters, feet, inches, centimeters, kilometers, miles, and more.',
    meta_title: 'Length Unit Converter - Free Online Conversion Tool',
    meta_description: 'Convert between any length units quickly and accurately. Free online tool supporting meters, feet, inches, centimeters, kilometers, miles, yards, and millimeters.',
    h1_title: 'Length Unit Converter',
    content: JSON.stringify({
      descriptionSections: [
        {
          title: 'What Is a Length Unit Converter?',
          paragraphs: [
            "A length unit converter is an essential tool for converting measurements between different units of length. Whether you're working with metric units (meters, centimeters, kilometers) or imperial units (feet, inches, miles), this converter handles all common length measurements with precision.",
            "Our converter supports 8 different length units: Meter, Centimeter, Millimeter, Kilometer, Inch, Foot, Yard, and Mile. Simply enter a value in any unit, select your target unit, and get instant, accurate results.",
            "This tool is perfect for students, engineers, architects, travelers, and anyone who needs quick and reliable length conversions for work, study, or daily life."
          ]
        },
        {
          title: 'How to Use the Length Unit Converter',
          paragraphs: [
            "Using the converter is simple and intuitive. Enter any value in the input field, select your source unit from the dropdown, then choose your target unit. The conversion happens in real-time as you type.",
            "The swap button lets you quickly reverse the conversion direction. The copy button allows you to transfer results to your clipboard instantly. You can also reset to default values at any time.",
            "All conversions use internationally standardized conversion factors, ensuring accuracy and consistency across all measurements."
          ]
        }
      ],
      faqSections: [
        {
          question: 'What length units are supported?',
          answer: 'The converter supports Meter, Centimeter, Millimeter, Kilometer, Inch, Foot, Yard, and Mile. You can convert between any combination of these units.'
        },
        {
          question: 'How accurate are the conversions?',
          answer: 'All conversions use internationally standardized conversion factors and display results with up to 6 decimal places for maximum precision.'
        },
        {
          question: 'Can I convert between metric and imperial units?',
          answer: 'Yes! The converter seamlessly handles conversions between metric (meters, centimeters, etc.) and imperial (feet, inches, etc.) units.'
        },
        {
          question: 'What is the base unit for conversions?',
          answer: 'The converter uses the meter as the base unit for all calculations, ensuring consistent and accurate results across all unit combinations.'
        }
      ]
    }),
    published: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

// Initialize seed data if not already present
export async function initializeSeedData() {
  try {
    console.log('Checking for existing seed data...');
    
    // Check if seed data already exists
    const existingPages = await kv.getByPrefix('page:');
    
    if (existingPages && existingPages.length > 0) {
      console.log(`Found ${existingPages.length} existing pages. Skipping seed.`);
      return { seeded: false, message: 'Seed data already exists', existingCount: existingPages.length };
    }
    
    console.log('No existing pages found. Seeding initial data...');
    
    // Seed the converter pages
    for (const converter of seedConverters) {
      await kv.set(`page:${converter.id}`, converter);
      console.log(`Seeded page: ${converter.title}`);
    }
    
    console.log(`Successfully seeded ${seedConverters.length} converter pages.`);
    return { seeded: true, count: seedConverters.length };
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    throw error;
  }
}

// Force seed data (overwrites existing)
export async function forceSeedData() {
  try {
    console.log('Force seeding data...');
    
    // Seed the converter pages
    for (const converter of seedConverters) {
      await kv.set(`page:${converter.id}`, converter);
      console.log(`Force seeded page: ${converter.title}`);
    }
    
    console.log(`Successfully force seeded ${seedConverters.length} converter pages.`);
    return { seeded: true, count: seedConverters.length, forced: true };
  } catch (error) {
    console.error(`Error force seeding data: ${error}`);
    throw error;
  }
}