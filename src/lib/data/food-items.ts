import { FoodItem } from '@/types';

const WEST_BENGAL_FOOD_ITEMS: Omit<FoodItem, 'state'>[] = [
  {
    id: 'food-1',
    name: 'Spongy Banglar Rosogolla (Tin / 6 Pcs)',
    bengaliName: 'স্পঞ্জ রসগোল্লা',
    category: 'SWEET',
    price: 180,
    description: 'The iconic GI-tagged crown jewel of Bengal confection. Fresh cow milk chhana kneaded to perfection and cooked in boiling aromatic light sugar syrup.',
    merchantName: 'Nobin Chandra Das & Sons Legacy',
    merchantLocation: 'Bagbazar, North Kolkata',
    district: 'Kolkata',
    merchantRating: 4.9,
    openingHours: '08:00 AM - 09:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rasgulla_preparation_for_Indian_wedding_09.jpg/1280px-Rasgulla_preparation_for_Indian_wedding_09.jpg',
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-2',
    name: 'Nolen Gur Jalbhora Sandesh (4 Pcs)',
    bengaliName: 'নলেন গুড়ের জলভরা সন্দেশ',
    category: 'SWEET',
    price: 240,
    description: 'Winter specialty sandesh molded from fresh chhana and date palm jaggery (nolen gur), with a molten center of liquid aromatic gur that bursts upon the first bite.',
    merchantName: 'Surya Kumar Modak Confectioners',
    merchantLocation: 'Chandannagar Strand',
    district: 'Hooghly',
    merchantRating: 4.95,
    openingHours: '07:30 AM - 10:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Sandesh_or_Sondesh.jpg/1280px-Sandesh_or_Sondesh.jpg',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-3',
    name: 'Kolkata Style Double Egg Mutton Roll',
    bengaliName: 'কলকাতা এগ মাটন রোল',
    category: 'STREET_FOOD',
    price: 190,
    description: 'Flaky layered pan-fried paratha coated with two farm eggs, stuffed with tender slow-cooked spicy mutton cubes, sliced red onions, green chilies, and a squeeze of fresh Gondhoraj lime.',
    merchantName: 'Nizam Heritage Rolls (Est. 1932)',
    merchantLocation: 'New Market, Kolkata',
    district: 'Kolkata',
    merchantRating: 4.8,
    openingHours: '11:00 AM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Egg_Roll_1414.JPG/1280px-Egg_Roll_1414.JPG',
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-4',
    name: 'Crispy Phuchka with Tangy Gondhoraj Jal (8 Pcs)',
    bengaliName: 'গন্ধরাজ ঘোল ফুচকা',
    category: 'SNACK',
    price: 80,
    description: 'Crispy deep-fried semolina puris stuffed with spicy mashed yellow pea and potato filling, infused with fragrant Gondhoraj lime and fiery tamarind-cumin water.',
    merchantName: 'Dakshin Kolkata Phuchka Kendra',
    merchantLocation: 'Southern Avenue, Kolkata',
    district: 'Kolkata',
    merchantRating: 4.88,
    openingHours: '03:30 PM - 09:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Indian_cuisine-Panipuri-03.jpg/1280px-Indian_cuisine-Panipuri-03.jpg',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-5',
    name: 'Traditional Basanti Pulao with Kosha Mangsho Platter',
    bengaliName: 'বাসন্তী পোলাও ও কষা মাংস',
    category: 'TRADITIONAL_MEAL',
    price: 460,
    description: 'Fragrant golden Gobindobhog rice scented with saffron, ghee, whole spices, cashews, and raisins, served alongside rich, dark, slow-braised Bengali spiced mutton curry and chutney.',
    merchantName: 'Golbari Flavors Heritage Kitchen',
    merchantLocation: 'Shyambazar Five Point, Kolkata',
    district: 'Kolkata',
    merchantRating: 4.9,
    openingHours: '12:00 PM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Basanti_Pulao.jpg/1280px-Basanti_Pulao.jpg',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-6',
    name: 'Authentic Earthen Pot Mishti Doi (500g)',
    bengaliName: 'মাটির ভাঁড়ের মিষ্টি দই',
    slug: 'earthen-pot-mishti-doi',
    category: 'SWEET',
    price: 160,
    description: 'Classic caramelized sweet yogurt set in unglazed terracotta earthen pots (matir bhar), allowing excess moisture to evaporate, yielding a velvety, dense, nutty texture.',
    merchantName: 'Nabadwip Doi Ghor',
    merchantLocation: 'Nabadwip Heritage Town, Nadia',
    district: 'Nadia',
    merchantRating: 4.92,
    openingHours: '07:00 AM - 09:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Mishti_Doi_%28Bengali_Sweet_Curd%29.jpg/1280px-Mishti_Doi_%28Bengali_Sweet_Curd%29.jpg',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  }
];

export const PAN_INDIA_FOOD_ITEMS: FoodItem[] = [
  // Rajasthan
  {
    id: 'food-raj-1',
    name: 'Royal Rajasthani Dal Baati Churma Thali',
    nativeName: 'दाल बाटी चूरमा',
    category: 'TRADITIONAL_MEAL',
    price: 380,
    description: 'Crisp whole-wheat dough baatis baked over cow-dung embers, submerged in pure desi ghee, served with fiery five-lentil panchmel dal, spicy garlic chutney, and sweet crushed wheat-jaggery churma.',
    merchantName: 'Rawat Bhojanalaya & Sweets',
    merchantLocation: 'Station Road, Sindhi Camp, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    merchantRating: 4.92,
    openingHours: '08:00 AM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Dal_Baati_Churma.jpg/1280px-Dal_Baati_Churma.jpg',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-raj-2',
    name: 'Traditional Malai Rabdi Ghewar (1 Pc / 400g)',
    nativeName: 'मलाई घेवर',
    category: 'SWEET',
    price: 320,
    description: 'Disc-shaped royal honeycomb confection made from clarified ghee and flour, dipped in saffron-cardamom sugar syrup, blanketed with thick reduced clotted cream (rabdi), chopped pistachios, and silver vark.',
    merchantName: 'Laxmi Mishthan Bhandar (LMB 1727)',
    merchantLocation: 'Johari Bazaar, Pink City, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    merchantRating: 4.95,
    openingHours: '07:30 AM - 11:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ghevar_with_Malai_Topping.jpg/1280px-Ghevar_with_Malai_Topping.jpg',
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-raj-3',
    name: 'Jodhpur Pyaaz Kachori & Mirchi Vada (2 Pcs Each)',
    nativeName: 'जोधपुरी प्याज़ कचौरी',
    category: 'SNACK',
    price: 140,
    description: 'Flaky golden deep-fried pastry generously stuffed with caramelized spiced onions, roasted coriander seeds, and garam masala, accompanied by batter-fried Bhavnagri green chili vada and tangy tamarind dip.',
    merchantName: 'Janta Sweet Home Heritage',
    merchantLocation: 'Nai Sarak, Near Clock Tower, Jodhpur',
    state: 'Rajasthan',
    district: 'Jodhpur',
    merchantRating: 4.88,
    openingHours: '06:30 AM - 10:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Pyaj_Kachori.jpg/1280px-Pyaj_Kachori.jpg',
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Punjab & Delhi
  {
    id: 'food-pun-1',
    name: 'Amritsari Sarson da Saag & Makki di Roti with White Butter',
    nativeName: 'ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ ਤੇ ਮੱਕੀ ਦੀ ਰੋਟੀ',
    category: 'TRADITIONAL_MEAL',
    price: 340,
    description: 'Slow-cooked fresh mustard greens and spinach simmered in clay pots with garlic, ginger, and green chilies, served with wood-fired yellow cornmeal flatbreads, homemade white churned butter, and organic gur.',
    merchantName: 'Bharawan Da Dhaba (Est. 1912)',
    merchantLocation: 'Near Golden Temple Town Hall, Amritsar',
    state: 'Punjab',
    district: 'Amritsar',
    merchantRating: 4.94,
    openingHours: '07:00 AM - 11:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Makki_di_roti_sarson_da_saag.jpg/1280px-Makki_di_roti_sarson_da_saag.jpg',
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-pun-2',
    name: 'Amritsari Chur Chur Aloo Pyaaz Kulcha with Pindi Chhole',
    nativeName: 'ਅੰਮ੍ਰਿਤਸਰੀ ਕੁਲਚਾ',
    category: 'STREET_FOOD',
    price: 220,
    description: 'Multi-layered crispy tandoori flatbread stuffed with spiced potatoes, onions, and pomegranate seeds, crushed by hand with melting pure ghee, paired with dark simmered chickpeas and pickled onions.',
    merchantName: 'Kulcha Land Heritage Specialists',
    merchantLocation: 'Ranjit Avenue, Amritsar',
    state: 'Punjab',
    district: 'Amritsar',
    merchantRating: 4.91,
    openingHours: '08:00 AM - 04:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Amritsari_Kulcha_with_Chhole.jpg/1280px-Amritsari_Kulcha_with_Chhole.jpg',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-del-1',
    name: 'Original 1947 Murgh Makhani (Delhi Butter Chicken)',
    nativeName: 'मुरग़ मखनी',
    category: 'TRADITIONAL_MEAL',
    price: 490,
    description: 'The legendary original butter chicken created in post-partition Delhi: succulent tandoor-roasted chicken pieces cooked in a silky, rich sauce of sun-ripened tomatoes, fresh butter, cream, and aromatic kasoori methi.',
    merchantName: 'Moti Mahal Delux Heritage 1947',
    merchantLocation: 'Netaji Subhash Marg, Daryaganj, New Delhi',
    state: 'Delhi',
    district: 'Central Delhi',
    merchantRating: 4.89,
    openingHours: '12:00 PM - 11:00 PM',
    images: [
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },

  // Maharashtra
  {
    id: 'food-mah-1',
    name: 'Iconic Mumbai Vada Pav with Lasun Chutney (Pair)',
    nativeName: 'मुंबई वडा पाव',
    category: 'STREET_FOOD',
    price: 70,
    description: 'Golden fried spiced potato batata vada nestled inside a pillowy soft ladi pav, smeared with fiery dry garlic chutney, coriander-mint chutney, and served with salted fried green chilies.',
    merchantName: 'Aram Milk Bar & Vada Pav (Est. 1939)',
    merchantLocation: 'Opposite CSMT Station, Fort, Mumbai',
    state: 'Maharashtra',
    district: 'Mumbai City',
    merchantRating: 4.93,
    openingHours: '08:30 AM - 09:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/3/36/Vada_pav_01.jpg',
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-mah-2',
    name: 'Fiery Puneri Special Misal Pav with Extra Rassa',
    nativeName: 'पुणेरी झणझणीत मिसळ',
    category: 'STREET_FOOD',
    price: 130,
    description: 'Spicy sprouted moth bean curry topped with crisp gram flour farsan, chopped red onions, and lemon wedge, served with a bowl of scalding aromatic red tarri (kat) gravy and fresh pav bread.',
    merchantName: 'Kata Kirr Authentic Misal',
    merchantLocation: 'Karve Road, Deccan Gymkhana, Pune',
    state: 'Maharashtra',
    district: 'Pune',
    merchantRating: 4.88,
    openingHours: '08:00 AM - 03:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Misal_Pav.JPG/1280px-Misal_Pav.JPG',
      'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-mah-3',
    name: 'Festive Maharashtrian Puran Poli with Desi Tup (3 Pcs)',
    nativeName: 'पुरण पोळी',
    category: 'SWEET',
    price: 180,
    description: 'Thin, melt-in-mouth artisanal flatbread stuffed with sweet cooked chana dal puree infused with organic jaggery, cardamom, and nutmeg, drenched in warm indigenous cow ghee (tup).',
    merchantName: 'Aaswad Upahar & Mithai Griha',
    merchantLocation: 'Shivaji Park, Dadar West, Mumbai',
    state: 'Maharashtra',
    district: 'Mumbai City',
    merchantRating: 4.92,
    openingHours: '10:00 AM - 10:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Puran_Poli_image.jpg/1280px-Puran_Poli_image.jpg',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Tamil Nadu
  {
    id: 'food-tn-1',
    name: 'Madurai Crispy Ghee Roast Masala Dosa with 3 Chutneys',
    nativeName: 'நெய் ரோஸ்ட் மசாலா தோசை',
    category: 'TRADITIONAL_MEAL',
    price: 160,
    description: 'Paper-thin fermented golden crepe roasted to perfection in fragrant pure cow ghee, folded over spiced turmeric potato masala, served with piping hot drumstick sambar, fresh coconut chutney, and tomato-shallot chutney.',
    merchantName: 'Murugan Idli Shop Legacy',
    merchantLocation: 'West Masi Street, Madurai',
    state: 'Tamil Nadu',
    district: 'Madurai',
    merchantRating: 4.96,
    openingHours: '07:00 AM - 11:00 PM',
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Masala_dosa_01.jpg/1280px-Masala_dosa_01.jpg'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-tn-2',
    name: 'Traditional Kumbakonam Degree Filter Coffee & Steamed Idli',
    nativeName: 'டிகிரி காபி & இட்லி',
    category: 'BEVERAGE',
    price: 110,
    description: 'Frothy, full-bodied decoction coffee prepared with pure chicory-blended plantation coffee and cows milk in traditional brass dabarah-tumbler, accompanied by two soft steamed pillow idlis.',
    merchantName: 'Saravana Heritage Tiffin & Coffee',
    merchantLocation: 'Mylapore Tank, Chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    merchantRating: 4.91,
    openingHours: '06:00 AM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Idli_Sambar_with_traditional_Filter_Kaapi.jpg/1280px-Idli_Sambar_with_traditional_Filter_Kaapi.jpg',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-tn-3',
    name: 'Chettinad Spicy Pepper Chicken Roast (Kozhi Milagu)',
    nativeName: 'செட்டிநாடு மிளகு கோழி',
    category: 'TRADITIONAL_MEAL',
    price: 360,
    description: 'Heritage Chettinad country chicken pan-roasted in cold-pressed sesame oil with freshly pounded black tellicherry peppercorns, fennel seeds, star anise, curry leaves, and small shallots.',
    merchantName: 'Anjappar Heritage Chettinad Kitchen',
    merchantLocation: 'Near Meenakshi Temple, Madurai',
    state: 'Tamil Nadu',
    district: 'Madurai',
    merchantRating: 4.87,
    openingHours: '11:30 AM - 11:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ChickenChettinad.JPG/1280px-ChickenChettinad.JPG',
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },

  // Uttar Pradesh
  {
    id: 'food-up-1',
    name: 'Awadhi Dum Gosht Biryani (Lucknowi Handi)',
    nativeName: 'अवधी दम गोश्त बिरयानी',
    category: 'TRADITIONAL_MEAL',
    price: 440,
    description: 'Long-grain aged basmati rice cooked in fragrant mutton stock (yakhni) with tender cuts of goat meat, saffron, kewra water, and subtle sweet spices, sealed with dough in a clay handi for slow dum cooking.',
    merchantName: 'Idris Biryani Heritage Awadh',
    merchantLocation: 'Patanala, Chowk, Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    merchantRating: 4.93,
    openingHours: '11:00 AM - 10:30 PM',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hyderabadi_Mutton_Biryani.jpg/1280px-Hyderabadi_Mutton_Biryani.jpg'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-up-2',
    name: 'Original Tunday Galouti Kebab with Roomali Roti (4 Pcs)',
    nativeName: 'टुंडे कबाबी गलौटी कबाब',
    category: 'STREET_FOOD',
    price: 260,
    description: 'World-famous melt-in-the-mouth finely ground lamb kebabs originally crafted for the toothless Nawab of Awadh, spiced with 160 secret botanical herbs and pan-seared in clarified butter.',
    merchantName: 'Tunday Kababi (Est. 1905)',
    merchantLocation: 'Phool Wali Gali, Aminabad, Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    merchantRating: 4.96,
    openingHours: '12:00 PM - 11:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Tunday_Kebab%2C_Lucknow_%288716416557%29.jpg',
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-up-3',
    name: 'Sacred Banarasi Meetha Paan with Gulkand (2 Pcs)',
    nativeName: 'बनारसी मीठा पान',
    category: 'SNACK',
    price: 60,
    description: 'Fresh tender Magahi betel leaf folded with Damascus rose petal preserve (gulkand), sweetened fennel seeds, crushed supari, dates, coconut shavings, menthol, and silver leaf.',
    merchantName: 'Keshav Tambool Bhandar',
    merchantLocation: 'Dashashwamedh Ghat Road, Varanasi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    merchantRating: 4.95,
    openingHours: '08:00 AM - 12:00 AM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/Meetha_paan_%2C_Uttar_Pradesh.jpg',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Telangana
  {
    id: 'food-tel-1',
    name: 'Authentic Hyderabadi Kachhi Dum Gosht Biryani',
    nativeName: 'حیدرآبادی دم بریانی',
    category: 'TRADITIONAL_MEAL',
    price: 420,
    description: 'Raw tender mutton marinated overnight in yogurt, papaya, fried golden onions, and royal spices, layered under fragrant parboiled basmati rice, saffron milk, and pure ghee, slow-steamed over coal fire.',
    merchantName: 'Paradise Heritage Kitchen (Est. 1953)',
    merchantLocation: 'SD Road, Secunderabad, Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    merchantRating: 4.91,
    openingHours: '11:30 AM - 11:30 PM',
    images: [
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Chicken_Hyderabadi_Biryani.JPG/1280px-Chicken_Hyderabadi_Biryani.JPG'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-tel-2',
    name: 'Charminar Irani Chai with Butter Osmania Biscuits (Combo)',
    nativeName: 'ایرانی چائے اور عثمانیہ بسکٹ',
    category: 'BEVERAGE',
    price: 90,
    description: 'Dense, caramelized slow-brewed tea crafted with reduced condensed milk, accompanied by four warm, crumbly sweet-and-salty Osmania butter biscuits named after the last Nizam.',
    merchantName: 'Nimrah Cafe & Bakery (Est. 1993)',
    merchantLocation: 'Beside Charminar Main Arch, Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    merchantRating: 4.96,
    openingHours: '04:00 AM - 11:30 PM',
    images: [
      'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Irani_chai_and_osmania_biscuits.jpg/1280px-Irani_chai_and_osmania_biscuits.jpg'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Gujarat
  {
    id: 'food-guj-1',
    name: 'Steamed Surti Nylon Khaman Dhokla with Sev & Chutney',
    nativeName: 'સુરતી નાયલોન ખમણ ઢોકળા',
    category: 'SNACK',
    price: 120,
    description: 'Ultra-soft, melt-in-mouth steamed fermented gram flour savory sponge, soaked in sweet-and-sour mustard-green chili tempering, sprinkled with fresh coconut, coriander, and crisp nylon sev.',
    merchantName: 'Das Khaman Heritage Shop (Est. 1922)',
    merchantLocation: 'Navrangpura, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    merchantRating: 4.93,
    openingHours: '07:30 AM - 08:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a4/Khaman_dhokla_%28cropped%29.jpg',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-guj-2',
    name: 'Royal Kathiyawadi Undhiyu & Puri Thali with Shrikhand',
    nativeName: 'કાઠિયાવાડી ઊંધિયું અને પૂરી',
    category: 'TRADITIONAL_MEAL',
    price: 360,
    description: 'Traditional Gujarati winter casserole of surti papdi, purple kand yam, small eggplants, and fenugreek dumplings (muthiyas) simmered in peanut-sesame masala, served with hot wheat puris and saffron shrikhand.',
    merchantName: 'Gordhan Thal Heritage Dining',
    merchantLocation: 'SG Highway, Bodakdev, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    merchantRating: 4.89,
    openingHours: '11:00 AM - 03:30 PM & 07:00 PM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Undhiyu.jpg/1280px-Undhiyu.jpg',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Kerala
  {
    id: 'food-ker-1',
    name: 'Kerala Appam with Coconut Milk Vegetable Stew',
    nativeName: 'കേരള അപ്പവും പച്ചക്കറി സ്റ്റൂവും',
    category: 'TRADITIONAL_MEAL',
    price: 190,
    description: 'Bowl-shaped fermented rice hoppers with a soft pillowy center and crisp lace borders, paired with fragrant, mildly spiced coconut milk stew infused with cinnamon, cloves, green chilies, and curry leaves.',
    merchantName: 'Grand Pavilion Heritage Kitchen',
    merchantLocation: 'MG Road, Fort Kochi / Ernakulam',
    state: 'Kerala',
    district: 'Ernakulam',
    merchantRating: 4.92,
    openingHours: '07:30 AM - 10:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Appam_%28hoppers%29_from_Kerala%2C_India.jpg/1280px-Appam_%28hoppers%29_from_Kerala%2C_India.jpg',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-ker-2',
    name: 'Malabar Porotta with Spiced Kerala Prawn Roast',
    nativeName: 'മലബാർ പൊറോട്ടയും കൊഞ്ചു റോസ്റ്റും',
    category: 'TRADITIONAL_MEAL',
    price: 390,
    description: 'Flaky, spiral-coiled multi-layered Malabar flatbread accompanied by Arabian Sea king prawns pan-roasted with shallots, crushed ginger-garlic, toasted coconut slivers, and fresh curry leaves.',
    merchantName: 'Paragon Restaurant (Est. 1939)',
    merchantLocation: 'Kannur Road, Kozhikode / Fort Kochi',
    state: 'Kerala',
    district: 'Ernakulam',
    merchantRating: 4.95,
    openingHours: '11:30 AM - 11:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Parotta_2.jpg',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: false,
    verifiedMerchant: true,
    available: true
  },

  // Odisha
  {
    id: 'food-odi-1',
    name: 'Authentic Nayagarh Baked Chhena Poda (Half Kg)',
    nativeName: 'ଓଡ଼ିଆ ଛେନାପୋଡ଼',
    category: 'SWEET',
    price: 260,
    description: 'The ancient indigenous cheesecake of Odisha: fresh cottage cheese (chhena), semolina, sugar, and crushed cardamom baked inside sal leaves for hours until the exterior forms a deep, fragrant caramelized crust.',
    merchantName: 'Nimapara Sweet Heritage',
    merchantLocation: 'Janpath, Bapuji Nagar, Bhubaneswar',
    state: 'Odisha',
    district: 'Khurda',
    merchantRating: 4.96,
    openingHours: '08:00 AM - 10:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Chhena_Poda_-_Choudwar_-_Cuttack_2018-01-26_9970.JPG/1280px-Chhena_Poda_-_Choudwar_-_Cuttack_2018-01-26_9970.JPG',
      'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },
  {
    id: 'food-odi-2',
    name: 'Kendrapara Rasabali in Saffron Rabri (4 Pcs)',
    nativeName: 'କେନ୍ଦ୍ରାପଡ଼ା ରସାବଳି',
    category: 'SWEET',
    price: 190,
    description: 'Flattened tender patties of seasoned fried cottage cheese steeped in thick, aromatic milk reduced with cardamom, nutmeg, and crushed pistachios, celebrated as an offering at Baladevjew Temple.',
    merchantName: 'Shree Jagannath Mahaprasad & Sweets',
    merchantLocation: 'Grand Road (Bada Danda), Puri',
    state: 'Odisha',
    district: 'Puri',
    merchantRating: 4.91,
    openingHours: '07:00 AM - 09:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rasabali%2C_Odisha_traditional_sweet.jpg/1280px-Rasabali%2C_Odisha_traditional_sweet.jpg',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Bihar
  {
    id: 'food-bih-1',
    name: 'Traditional Bihari Sattu Litti Chokha with Desi Ghee',
    nativeName: 'लिट्टी चोखा',
    category: 'TRADITIONAL_MEAL',
    price: 170,
    description: 'Rustic whole-wheat balls stuffed with spicy roasted gram flour (sattu), ajwain, kalonji, mustard oil, and lemon juice, coal-roasted, dipped in molten desi cow ghee, served with smoky roasted baingan-tamatar chokha.',
    merchantName: 'Bhojpuri Heritage Litti Kendra',
    merchantLocation: 'Boring Road, Patna',
    state: 'Bihar',
    district: 'Patna',
    merchantRating: 4.93,
    openingHours: '09:00 AM - 10:00 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Litti_Chokha_-_Kolkata.jpg/1280px-Litti_Chokha_-_Kolkata.jpg',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Assam
  {
    id: 'food-asm-1',
    name: 'Assamese Bihu Til Pitha & Single-Origin Orthodox Assam Tea',
    nativeName: 'তিল পিঠা আৰু অসমীয়া চাহ',
    category: 'BEVERAGE',
    price: 150,
    description: 'Crisp rolled cylinders of sticky bora rice stuffed with sweetened toasted black sesame and liquid date palm jaggery, accompanied by a steaming cup of malty, single-origin orthodox whole-leaf Assam golden tea.',
    merchantName: 'Kaziranga Valley Tea & Pitha Ghor',
    merchantLocation: 'Bokakhat Market, Golaghat',
    state: 'Assam',
    district: 'Golaghat',
    merchantRating: 4.9,
    openingHours: '06:30 AM - 08:30 PM',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Til_Pitha_2.jpg/1280px-Til_Pitha_2.jpg',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  },

  // Kashmir
  {
    id: 'food-jhk-1',
    name: 'Royal Kashmiri Saffron Kahwa with Girda & Shirmal',
    nativeName: 'کشمیری قہوہ',
    category: 'BEVERAGE',
    price: 160,
    description: 'Ethereal golden green tea brewed in a traditional copper samovar with whole Kashmiri saffron threads, cinnamon, crushed green cardamom, and blanched almond slivers, served with fresh traditional tandoori bread.',
    merchantName: 'Ahdoos Heritage Bakery (Est. 1918)',
    merchantLocation: 'Residency Road, Srinagar',
    state: 'Jammu and Kashmir',
    district: 'Srinagar',
    merchantRating: 4.97,
    openingHours: '08:00 AM - 10:00 PM',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Kashmiri_tea_Kawa.jpg/1280px-Kashmiri_tea_Kawa.jpg'
    ],
    isVegetarian: true,
    verifiedMerchant: true,
    available: true
  }
];

export const CANONICAL_FOOD_ITEMS: FoodItem[] = [
  ...WEST_BENGAL_FOOD_ITEMS.map(item => ({ ...item, state: 'West Bengal' })),
  ...PAN_INDIA_FOOD_ITEMS
];
