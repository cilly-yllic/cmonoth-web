// https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json //

// region : timezone
type Timezone = string

export interface Regions {
  [region: string]: Timezone
}
export const REGIONS: Regions = {
  'Africa/Banjul': 'Africa/Abidjan',
  'Africa/Conakry': 'Africa/Abidjan',
  'Africa/Dakar': 'Africa/Abidjan',
  'Africa/Freetown': 'Africa/Abidjan',
  'Africa/Lome': 'Africa/Abidjan',
  'Africa/Nouakchott': 'Africa/Abidjan',
  'Africa/Ouagadougou': 'Africa/Abidjan',
  'Africa/Sao_Tome': 'Africa/Abidjan',
  'Africa/Timbuktu': 'Africa/Abidjan',
  'Atlantic/St_Helena': 'Africa/Abidjan',

  Egypt: 'Africa/Cairo',
  'Africa/Maseru': 'Africa/Johannesburg',
  'Africa/Mbabane': 'Africa/Johannesburg',

  'Africa/Juba': 'Africa/Khartoum',

  'Africa/Bangui': 'Africa/Lagos',
  'Africa/Brazzaville': 'Africa/Lagos',
  'Africa/Douala': 'Africa/Lagos',
  'Africa/Kinshasa': 'Africa/Lagos',
  'Africa/Libreville': 'Africa/Lagos',
  'Africa/Luanda': 'Africa/Lagos',
  'Africa/Malabo': 'Africa/Lagos',
  'Africa/Niamey': 'Africa/Lagos',
  'Africa/Porto-Novo': 'Africa/Lagos',

  'Africa/Blantyre': 'Africa/Maputo',
  'Africa/Bujumbura': 'Africa/Maputo',
  'Africa/Gaborone': 'Africa/Maputo',
  'Africa/Harare': 'Africa/Maputo',
  'Africa/Kigali': 'Africa/Maputo',
  'Africa/Lubumbashi': 'Africa/Maputo',
  'Africa/Lusaka': 'Africa/Maputo',

  'Africa/Addis_Ababa': 'Africa/Nairobi',
  'Africa/Asmara': 'Africa/Nairobi',
  'Africa/Asmera': 'Africa/Nairobi',
  'Africa/Dar_es_Salaam': 'Africa/Nairobi',
  'Africa/Djibouti': 'Africa/Nairobi',
  'Africa/Kampala': 'Africa/Nairobi',
  'Africa/Mogadishu': 'Africa/Nairobi',
  'Africa/Antananarivo': 'Africa/Nairobi',
  'Africa/Comoro': 'Africa/Nairobi',
  'Africa/Mayotte': 'Africa/Nairobi',

  Libya: 'Africa/Tripoli',

  'America/Atka': 'America/Adak',
  'US/Aleutian': 'America/Adak',

  'US/Alaska': 'America/Anchorage',

  'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
  'America/Argentina/ComodRivadavia': 'America/Argentina/Catamarca',
  'America/Catamarca': 'America/Argentina/Catamarca',
  'America/Cordoba': 'America/Argentina/Cordoba',
  'America/Rosario': 'America/Argentina/Cordoba',
  'America/Jujuy': 'America/Argentina/Jujuy',
  'America/Mendoza': 'America/Argentina/Mendoza',

  'America/Coral_Harbour': 'America/Atikokan',

  'US/Central': 'America/Chicago',

  'America/Aruba': 'America/Curacao',
  'America/Kralendijk': 'America/Curacao',
  'America/Lower_Princes': 'America/Curacao',

  'America/Shiprock': 'America/Denver',
  Navajo: 'America/Denver',
  'US/Mountain': 'America/Denver',

  'US/Michigan': 'America/Detroit',

  'Canada/Mountain': 'America/Edmonton',

  'America/Indiana/Indianapolis': 'America/Fort_Wayne',
  'America/Indianapolis': 'America/Fort_Wayne',
  'US/East-Indiana': 'America/Fort_Wayne',

  'Canada/Atlantic': 'America/Halifax',

  Cuba: 'America/Havana',

  'America/Knox_IN': 'America/Indiana/Knox',
  'US/Indiana-Starke': 'America/Indiana/Knox',

  Jamaica: 'America/Jamaica',

  'America/Louisville': 'America/Kentucky/Louisville',

  'US/Pacific': 'America/Los_Angeles',
  'US/Pacific-New': 'America/Los_Angeles',

  'Brazil/West': 'America/Manaus',

  'Mexico/BajaSur': 'America/Mazatlan',

  'Mexico/General': 'America/Mexico_City',

  'US/Eastern': 'America/New_York',

  'Brazil/DeNoronha': 'America/Noronha',

  'America/Cayman': 'America/Panama',

  'US/Arizona': 'America/Phoenix',

  'America/Anguilla': 'America/Port_of_Spain',
  'America/Antigua': 'America/Port_of_Spain',
  'America/Dominica': 'America/Port_of_Spain',
  'America/Grenada': 'America/Port_of_Spain',
  'America/Guadeloupe': 'America/Port_of_Spain',
  'America/Marigot': 'America/Port_of_Spain',
  'America/Montserrat': 'America/Port_of_Spain',
  'America/St_Barthelemy': 'America/Port_of_Spain',
  'America/St_Kitts': 'America/Port_of_Spain',
  'America/St_Lucia': 'America/Port_of_Spain',
  'America/St_Thomas': 'America/Port_of_Spain',
  'America/St_Vincent': 'America/Port_of_Spain',
  'America/Tortola': 'America/Port_of_Spain',
  'America/Virgin': 'America/Port_of_Spain',

  'Canada/East-Saskatchewan': 'America/Regina',
  'Canada/Saskatchewan': 'America/Regina',

  'America/Porto_Acre': 'America/Rio_Branco',
  'Brazil/Acre': 'America/Rio_Branco',

  'Chile/Continental': 'America/Santiago',

  'Brazil/East': 'America/Sao_Paulo',

  'Canada/Newfoundland': 'America/St_Johns',

  'America/Ensenada': 'America/Tijuana',
  'America/Santa_Isabel': 'America/Tijuana',
  'Mexico/BajaNorte': 'America/Tijuana',

  'America/Montreal': 'America/Toronto',
  'Canada/Eastern': 'America/Toronto',

  'Canada/Pacific': 'America/Vancouver',

  'Canada/Yukon': 'America/Whitehorse',

  'Canada/Central': 'America/Winnipeg',

  'Asia/Ashkhabad': 'Asia/Ashgabat',

  'Asia/Phnom_Penh': 'Asia/Bangkok',
  'Asia/Vientiane': 'Asia/Bangkok',

  'Asia/Dacca': 'Asia/Dhaka',

  'Asia/Muscat': 'Asia/Dubai',

  'Asia/Saigon': 'Asia/Ho_Chi_Minh',

  Hongkong: 'Asia/Hong_Kong',

  'Asia/Tel_Aviv': 'Asia/Jerusalem',
  Israel: 'Asia/Jerusalem',

  'Asia/Katmandu': 'Asia/Kathmandu',

  'Asia/Macao': 'Asia/Macau',

  'Asia/Ujung_Pandang': 'Asia/Makassar',

  'Europe/Nicosia': 'Asia/Nicosia',

  'Asia/Bahrain': 'Asia/Qatar',

  'Asia/Yangon': 'Asia/Rangoon',

  'Asia/Aden': 'Asia/Riyadh',
  'Asia/Kuwait': 'Asia/Riyadh',

  ROK: 'Asia/Seoul',

  'Asia/Chongqing': 'Asia/Shanghai',
  'Asia/Chungking': 'Asia/Shanghai',
  'Asia/Harbin': 'Asia/Shanghai',
  PRC: 'Asia/Shanghai',

  Singapore: 'Asia/Singapore',

  ROC: 'Asia/Taipei',

  Iran: 'Asia/Tehran',

  'Asia/Thimbu': 'Asia/Thimphu',

  Japan: 'Asia/Tokyo',

  'Asia/Ulan_Bator': 'Asia/Ulaanbaatar',

  'Asia/Kashgar': 'Asia/Urumqi',

  'Atlantic/Faeroe': 'Atlantic/Faroe',
  Iceland: 'Atlantic/Reykjavik',

  'Australia/South': 'Australia/Adelaide',

  'Australia/Queensland': 'Australia/Brisbane',

  'Australia/Yancowinna': 'Australia/Broken_Hill',

  'Australia/North': 'Australia/Darwin',

  'Australia/Tasmania': 'Australia/Hobart',

  'Australia/LHI': 'Australia/Lord_Howe',

  'Australia/Victoria': 'Australia/Melbourne',

  'Australia/West': 'Australia/Perth',

  'Australia/ACT': 'Australia/Sydney',
  'Australia/Canberra': 'Australia/Sydney',
  'Australia/NSW': 'Australia/Sydney',

  'Etc/GMT': 'Etc/GMT+0',
  'Etc/GMT-0': 'Etc/GMT+0',
  'Etc/GMT0': 'Etc/GMT+0',
  'Etc/Greenwich': 'Etc/GMT+0',
  GMT: 'Etc/GMT+0',
  'GMT+0': 'Etc/GMT+0',
  'GMT-0': 'Etc/GMT+0',
  GMT0: 'Etc/GMT+0',
  Greenwich: 'Etc/GMT+0',

  UCT: 'Etc/UCT',
  'Etc/Universal': 'Etc/UCT',
  'Etc/Zulu': 'Etc/UCT',
  UTC: 'Etc/UCT',
  Universal: 'Etc/UCT',
  Zulu: 'Etc/UCT',

  'Europe/Ljubljana': 'Europe/Belgrade',
  'Europe/Podgorica': 'Europe/Belgrade',
  'Europe/Sarajevo': 'Europe/Belgrade',
  'Europe/Skopje': 'Europe/Belgrade',
  'Europe/Zagreb': 'Europe/Belgrade',

  'Europe/Tiraspol': 'Europe/Chisinau',

  Eire: 'Europe/Dublin',

  'Europe/Mariehamn': 'Europe/Helsinki',

  'Asia/Istanbul': 'Europe/Istanbul',
  Turkey: 'Europe/Istanbul',

  Portugal: 'Europe/Lisbon',
  'Europe/Belfast': 'Europe/Lisbon',
  'Europe/Guernsey': 'Europe/Lisbon',
  'Europe/Isle_of_Man': 'Europe/Lisbon',
  'Europe/Jersey': 'Europe/Lisbon',
  GB: 'Europe/Lisbon',
  'GB-Eire': 'Europe/Lisbon',

  'W-SU': 'Europe/Moscow',

  'Arctic/Longyearbyen': 'Europe/Oslo',
  'Atlantic/Jan_Mayen': 'Europe/Oslo',

  'Europe/Bratislava': 'Europe/Prague',

  'Europe/San_Marino': 'Europe/Rome',
  'Europe/Vatican': 'Europe/Rome',

  Poland: 'Europe/Warsaw',

  'Europe/Busingen': 'Europe/Zurich',
  'Europe/Vaduz': 'Europe/Zurich',

  'Antarctica/McMurdo': 'Pacific/Auckland',
  'Antarctica/South_Pole': 'Pacific/Auckland',
  NZ: 'Pacific/Auckland',

  'NZ-CHAT': 'Pacific/Chatham',

  'Pacific/Truk': 'Pacific/Chuuk',
  'Pacific/Yap': 'Pacific/Chuuk',

  'Chile/EasterIsland': 'Pacific/Easter',

  'Pacific/Saipan': 'Pacific/Guam',

  'Pacific/Johnston': 'Pacific/Honolulu',
  'US/Hawaii': 'Pacific/Honolulu',

  Kwajalein: 'Pacific/Kwajalein',

  'Pacific/Midway': 'Pacific/Pago_Pago',
  'Pacific/Samoa': 'Pacific/Pago_Pago',
  'US/Samoa': 'Pacific/Pago_Pago',

  'Pacific/Ponape': 'Pacific/Pohnpei',
}
