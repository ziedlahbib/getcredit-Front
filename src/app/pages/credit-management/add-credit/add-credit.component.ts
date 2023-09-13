import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Credit } from 'src/app/model/credit';
import { Creditrefuse } from 'src/app/model/creditrefuse.model';
import { Magasin } from 'src/app/model/magasin';
import { Produit } from 'src/app/model/produit';
import { User } from 'src/app/model/user';
import { CreditServiceService } from 'src/app/service/credit-service.service';
import { CreditrefuseService } from 'src/app/service/creditrefuse.service';
import { DjangoService } from 'src/app/service/django.service';
import { MagasinServiceService } from 'src/app/service/magasin-service.service';
import { ProduitServiceService } from 'src/app/service/produit-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';


@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {
  // columns = Object.keys(uniqueValues);
  // uniqueValues = uniqueValues;
  // translations = translations;
  placeholder = 'Choisir une option';
  // columns = ['age', 'workclass', 'education',
  //   'education_num', 'marital_status', 'occupation',
  //   'relationship', 'race', 'gender', 'capital_gain', 'capital_loss',
  //   'hours_per_week', 'native_country'];
    columns = ['age', 'workclass', 'education',
    'education_num', 'marital_status', 'occupation',
    'relationship',  'capital_gain', 'capital_loss',
    'hours_per_week', 'native_country'];
  uniqueValues = {
    age: [39, 50, 38, 53, 28, 37, 49, 52, 31, 42, 30, 23, 32, 40, 34, 25, 43, 54, 35, 59, 56, 19, 20, 45, 22, 48, 21, 24, 57, 44, 41, 29, 18, 47, 46, 36, 79, 27, 67, 33, 76, 17, 55, 61, 70, 64, 71, 68, 66, 51, 58, 26, 60, 90, 75, 65, 77, 62, 63, 80, 72, 74, 69, 73, 81, 78, 88, 82, 83, 84, 85, 86, 87],
    workclass: ['State-gov', 'Self-emp-not-inc', 'Private', 'Federal-gov', 'Local-gov', '?', 'Self-emp-inc', 'Without-pay', 'Never-worked'],
    education: ['Bachelors', 'HS-grad', '11th', 'Masters', '9th', 'Some-college', 'Assoc-acdm', 'Assoc-voc', '7th-8th', 'Doctorate', 'Prof-school', '5th-6th', '10th', '1st-4th', 'Preschool', '12th'],
    education_num: [13, 9, 7, 14, 5, 10, 12, 11, 4, 16, 15, 3, 6, 2, 1, 8],
    marital_status: ['Never-married', 'Married-civ-spouse', 'Divorced', 'Married-spouse-absent', 'Separated', 'Married-AF-spouse', 'Widowed'],
    occupation: ['Adm-clerical', 'Exec-managerial', 'Handlers-cleaners', 'Prof-specialty', 'Other-service', 'Sales', 'Craft-repair', 'Transport-moving', 'Farming-fishing', 'Machine-op-inspct', 'Tech-support', '?', 'Protective-serv', 'Armed-Forces', 'Priv-house-serv'],
    relationship: ['Not-in-family', 'Husband', 'Wife', 'Own-child', 'Unmarried', 'Other-relative'],
    // race: ['White', 'Black', 'Asian-Pac-Islander', 'Amer-Indian-Eskimo', 'Other'],
    // gender: ['Male', 'Female'],
    capital_gain: [2174, 0, 14084, 5178, 5013, 2407, 14344, 15024, 7688, 34095, 4064, 4386, 7298, 1409, 3674, 1055, 3464, 2050, 2176, 594, 20051, 6849, 4101, 1111, 8614, 3411, 2597, 25236, 4650, 9386, 2463, 3103, 10605, 2964, 3325, 2580, 3471, 4865, 99999, 6514, 1471, 2329, 2105, 2885, 25124, 10520, 2202, 2961, 27828, 6767, 2228, 1506, 13550, 2635, 5556, 4787, 3781, 3137, 3818, 3942, 914, 401, 2829, 2977, 4934, 2062, 2354, 5455, 15020, 1424, 3273, 22040, 4416, 3908, 10566, 991, 4931, 1086, 7430, 6497, 114, 7896, 2346, 3418, 3432, 2907, 1151, 2414, 2290, 15831, 41310, 4508, 2538, 3456, 6418, 1848, 3887, 5721, 9562, 1455, 2036, 1831, 11678, 2936, 2993, 7443, 6360, 1797, 1173, 4687, 6723, 2009, 6097, 2653, 1639, 18481, 7978, 2387, 5060],
    capital_loss: [0, 2042, 1408, 1902, 1573, 1887, 1719, 1762, 1564, 2179, 1816, 1980, 1977, 1876, 1340, 2206, 1741, 1485, 2339, 2415, 1380, 1721, 2051, 2377, 1669, 2352, 1672, 653, 2392, 1504, 2001, 1590, 1651, 1628, 1848, 1740, 2002, 1579, 2258, 1602, 419, 2547, 2174, 2205, 1726, 2444, 1138, 2238, 625, 213, 1539, 880, 1668, 1092, 1594, 3004, 2231, 1844, 810, 2824, 2559, 2057, 1974, 974, 2149, 1825, 1735, 1258, 2129, 2603, 2282, 323, 4356, 2246, 1617, 1648, 2489, 3770, 1755, 3683, 2267, 2080, 2457, 155, 3900, 2201, 1944, 2467, 2163, 2754, 2472, 1411],
    hours_per_week: [40, 13, 16, 45, 50, 80, 30, 35, 60, 20, 52, 44, 15, 25, 38, 43, 55, 48, 58, 32, 70, 2, 22, 56, 41, 28, 36, 24, 46, 42, 12, 65, 1, 10, 34, 75, 98, 33, 54, 8, 6, 64, 19, 18, 72, 5, 9, 47, 37, 21, 26, 14, 4, 59, 7, 99, 53, 39, 62, 57, 78, 90, 66, 11, 49, 84, 3, 17, 68, 27, 85, 31, 51, 77, 63, 23, 87, 88, 73, 89, 97, 94, 29, 96, 67, 82, 86, 91, 81, 76, 92, 61, 74, 95],
    native_country: ['United-States', 'Cuba', 'Jamaica', 'India', '?', 'Mexico', 'South', 'Puerto-Rico', 'Honduras', 'England', 'Canada', 'Germany', 'Iran', 'Philippines', 'Italy', 'Poland', 'Columbia', 'Cambodia', 'Thailand', 'Ecuador', 'Laos', 'Taiwan', 'Haiti', 'Portugal', 'Dominican-Republic', 'El-Salvador', 'France', 'Guatemala', 'China', 'Japan', 'Yugoslavia', 'Peru', 'Outlying-US(Guam-USVI-etc)', 'Scotland', 'Trinadad&Tobago', 'Greece', 'Nicaragua', 'Vietnam', 'Hong', 'Ireland', 'Hungary', 'Holand-Netherlands'],
  };
  columnTranslations = {
    age: {
      label: 'Âge',
      values: {
        39: '39 ans', 50: '50 ans', 38: '38 ans', 53: '53 ans', 28: '28 ans',
        37: '37 ans', 49: '49 ans', 52: '52 ans', 31: '31 ans', 42: '42 ans',
        30: '30 ans', 23: '23 ans', 32: '32 ans', 40: '40 ans', 34: '34 ans',
        25: '25 ans', 43: '43 ans', 54: '54 ans', 35: '35 ans', 59: '59 ans',
        56: '56 ans', 19: '19 ans', 20: '20 ans', 45: '45 ans', 22: '22 ans',
        48: '48 ans', 21: '21 ans', 24: '24 ans', 57: '57 ans', 44: '44 ans',
        41: '41 ans', 29: '29 ans', 18: '18 ans', 47: '47 ans', 46: '46 ans',
        36: '36 ans', 79: '79 ans', 27: '27 ans', 67: '67 ans', 33: '33 ans',
        76: '76 ans', 17: '17 ans', 55: '55 ans', 61: '61 ans', 70: '70 ans',
        64: '64 ans', 71: '71 ans', 68: '68 ans', 66: '66 ans', 51: '51 ans',
        58: '58 ans', 26: '26 ans', 60: '60 ans', 90: '90 ans', 75: '75 ans',
        65: '65 ans', 77: '77 ans', 62: '62 ans', 63: '63 ans', 80: '80 ans',
        72: '72 ans', 74: '74 ans', 69: '69 ans', 73: '73 ans', 81: '81 ans',
        78: '78 ans', 88: '88 ans', 82: '82 ans', 83: '83 ans', 84: '84 ans',
        85: '85 ans', 86: '86 ans', 87: '87 ans'
      }
    },
    workclass: {
      label: 'Classe de travail',
      values: {
        'State-gov': 'Gouvernement d\'État', 'Self-emp-not-inc': 'Indépendant (non incorporé)',
        'Private': 'Privé', 'Federal-gov': 'Gouvernement fédéral', 'Local-gov': 'Gouvernement local',
        '?': '?', 'Self-emp-inc': 'Indépendant (incorporé)', 'Without-pay': 'Sans salaire', 'Never-worked': 'Jamais travaillé'
      }

    },
    education: {
      label: "Niveau d'éducation",
      values: {
        'Bachelors': 'Licence', 'HS-grad': 'Diplôme d\'études secondaires',
        '11th': '11e année', 'Masters': 'Maîtrise', '9th': '9e année', 'Some-college': 'Certificat / Collège',
        'Assoc-acdm': 'Diplôme associé en arts / sciences', 'Assoc-voc': 'Diplôme associé professionnel',
        '7th-8th': '7e-8e année', 'Doctorate': 'Doctorat', 'Prof-school': 'École professionnelle',
        '5th-6th': '5e-6e année', '10th': '10e année', '1st-4th': '1ère-4e année', 'Preschool': 'Préscolaire', '12th': '12e année'
      }

    },
    education_num: {
      label: "Nombre d\'années d\'éducation",
      values: {
        13: '13', 9: '9', 7: '7', 14: '14', 5: '5', 10: '10', 12: '12', 11: '11', 4: '4', 16: '16',
        15: '15', 3: '3', 6: '6', 2: '2', 1: '1', 8: '8'
      }

    },
    marital_status: {
      label: 'Situation matrimoniale',
      values: {
        'Never-married': 'Jamais marié', 'Married-civ-spouse': 'Marié civilement', 'Divorced': 'Divorcé',
        'Married-spouse-absent': 'Marié avec conjoint absent', 'Separated': 'Séparé',
        'Married-AF-spouse': 'Marié avec conjoint de l\'armée de l\'air', 'Widowed': 'Veuf'
      }

    },
    occupation: {
      label: 'Profession',
      values: {
        'Adm-clerical': 'Administration et travail de bureau', 'Exec-managerial': 'Cadre et direction',
        'Handlers-cleaners': 'Manutentionnaires et nettoyeurs', 'Prof-specialty': 'Spécialité professionnelle',
        'Other-service': 'Autre service', 'Sales': 'Ventes', 'Craft-repair': 'Artisanat et réparation',
        'Transport-moving': 'Transport et déménagement', 'Farming-fishing': 'Agriculture et pêche',
        'Machine-op-inspct': 'Opérateurs de machines et inspecteurs', 'Tech-support': 'Support technique',
        '?': '?', 'Protective-serv': 'Services de protection', 'Armed-Forces': 'Forces armées',
        'Priv-house-serv': 'Service domestique privé'
      }

    },
    relationship: {
      label: 'Relation',
      values: {
        'Not-in-family': 'Pas dans la famille', 'Husband': 'Mari', 'Wife': 'Femme',
        'Own-child': 'Enfant propre', 'Unmarried': 'Non marié', 'Other-relative': 'Autre parent'
      }

    },
    // race: {
    //   label: 'Race',
    //   values: {
    //     'White': 'Blanc', 'Black': 'Noir', 'Asian-Pac-Islander': 'Asie-Pacifique',
    //     'Amer-Indian-Eskimo': 'Indien amér./Esquimau', 'Other': 'Autre'
    //   }

    // },
    // gender: {
    //   label: 'Genre',
    //   values: { 'Male': 'Homme', 'Female': 'Femme' }

    // },
    capital_gain: {
      label: 'Gain en capital',
      values: {
        2174: '2174', 0: '0', 14084: '14084', 5178: '5178', 5013: '5013', 2407: '2407',
        14344: '14344', 15024: '15024', 7688: '7688', 34095: '34095', 4064: '4064',
        4386: '4386', 7298: '7298', 1409: '1409', 3674: '3674', 1055: '1055',
        3464: '3464', 2050: '2050', 2176: '2176', 594: '594', 20051: '20051',
        6849: '6849', 4101: '4101', 1111: '1111', 8614: '8614', 3411: '3411',
        2597: '2597', 25236: '25236', 4650: '4650', 9386: '9386', 2463: '2463',
        3103: '3103', 10605: '10605', 2964: '2964', 3325: '3325', 2580: '2580',
        3471: '3471', 4865: '4865', 99999: '99999', 6514: '6514', 1471: '1471',
        2329: '2329', 2105: '2105', 2885: '2885', 25124: '25124', 10520: '10520',
        2202: '2202', 2961: '2961', 27828: '27828', 6767: '6767', 2228: '2228',
        1506: '1506', 13550: '13550', 2635: '2635', 5556: '5556', 4787: '4787',
        3781: '3781', 3137: '3137', 3818: '3818', 3942: '3942', 914: '914',
        401: '401', 2829: '2829', 2977: '2977', 4934: '4934', 2062: '2062',
        2354: '2354', 5455: '5455', 15020: '15020', 1424: '1424', 3273: '3273',
        22040: '22040', 4416: '4416', 3908: '3908', 10566: '10566', 991: '991',
        4931: '4931', 1086: '1086', 7430: '7430', 6497: '6497', 114: '114',
        7896: '7896', 2346: '2346', 3418: '3418', 3432: '3432', 2907: '2907',
        1151: '1151', 2414: '2414', 2290: '2290', 15831: '15831', 41310: '41310',
        4508: '4508', 2538: '2538', 3456: '3456', 6418: '6418', 1848: '1848',
        3887: '3887', 5721: '5721', 9562: '9562', 1455: '1455', 2036: '2036',
        1831: '1831', 11678: '11678', 2936: '2936', 2993: '2993', 7443: '7443',
        6360: '6360', 1797: '1797', 1173: '1173', 4687: '4687', 6723: '6723',
        2009: '2009', 6097: '6097', 2653: '2653', 1639: '1639', 18481: '18481',
        7978: '7978', 2387: '2387', 5060: '5060',
      }

    },
    capital_loss: {
      label: 'Perte en capital',
      values: {
        0: '0', 2042: '2042', 1408: '1408', 1902: '1902', 1573: '1573', 1887: '1887',
        1719: '1719', 1762: '1762', 1564: '1564', 2179: '2179', 1816: '1816',
        1980: '1980', 1977: '1977', 1876: '1876', 1340: '1340', 2206: '2206',
        1741: '1741', 1485: '1485', 2339: '2339', 2415: '2415', 1380: '1380',
        1721: '1721', 2051: '2051', 2377: '2377', 1669: '1669', 2352: '2352',
        1672: '1672', 653: '653', 2392: '2392', 1504: '1504', 2001: '2001',
        1590: '1590', 1651: '1651', 1628: '1628', 1848: '1848', 1740: '1740',
        2002: '2002', 1579: '1579', 2258: '2258', 1602: '1602', 419: '419',
        2547: '2547', 2174: '2174', 2205: '2205', 1726: '1726', 2444: '2444',
        1138: '1138', 2238: '2238', 625: '625', 213: '213', 1539: '1539',
        880: '880', 1668: '1668', 1092: '1092', 1594: '1594', 3004: '3004',
        2231: '2231', 1844: '1844', 810: '810', 2824: '2824', 2559: '2559',
        2057: '2057', 1974: '1974', 974: '974', 2149: '2149', 1825: '1825',
        1735: '1735', 1258: '1258', 2129: '2129', 2603: '2603', 2282: '2282',
        323: '323', 4356: '4356', 2246: '2246', 1617: '1617', 1648: '1648',
        2489: '2489', 3770: '3770', 1755: '1755', 3683: '3683', 2267: '2267',
        2080: '2080', 2457: '2457', 155: '155', 3900: '3900', 2201: '2201',
        1944: '1944', 2467: '2467', 2163: '2163', 2754: '2754', 2472: '2472',
        1411: '1411',
      }

    },
    hours_per_week: {
      label: "Nombre d\'heures travaillées par semaine",
      values: {
        40: '40 heures', 13: '13 heures', 16: '16 heures', 45: '45 heures', 50: '50 heures',
        80: '80 heures', 30: '30 heures', 35: '35 heures', 60: '60 heures', 20: '20 heures',
        52: '52 heures', 44: '44 heures', 15: '15 heures', 25: '25 heures', 38: '38 heures',
        43: '43 heures', 55: '55 heures', 48: '48 heures', 58: '58 heures', 32: '32 heures',
        70: '70 heures', 2: '2 heures', 22: '22 heures', 56: '56 heures', 41: '41 heures',
        28: '28 heures', 36: '36 heures', 24: '24 heures', 46: '46 heures', 42: '42 heures',
        12: '12 heures', 65: '65 heures', 1: '1 heure', 10: '10 heures', 34: '34 heures',
        75: '75 heures', 98: '98 heures', 33: '33 heures', 54: '54 heures', 8: '8 heures',
        6: '6 heures', 64: '64 heures', 19: '19 heures', 18: '18 heures', 72: '72 heures',
        5: '5 heures', 9: '9 heures', 47: '47 heures', 37: '37 heures', 21: '21 heures',
        26: '26 heures', 14: '14 heures', 4: '4 heures', 59: '59 heures', 7: '7 heures',
        99: '99 heures', 53: '53 heures', 39: '39 heures', 62: '62 heures', 57: '57 heures',
        78: '78 heures', 90: '90 heures', 66: '66 heures', 11: '11 heures', 49: '49 heures',
        84: '84 heures', 3: '3 heures', 17: '17 heures', 68: '68 heures', 27: '27 heures',
        85: '85 heures', 31: '31 heures', 51: '51 heures', 77: '77 heures', 63: '63 heures',
        23: '23 heures', 87: '87 heures', 88: '88 heures', 73: '73 heures', 89: '89 heures',
        97: '97 heures', 94: '94 heures', 29: '29 heures', 96: '96 heures', 67: '67 heures',
        82: '82 heures', 86: '86 heures', 91: '91 heures', 81: '81 heures', 76: '76 heures',
        92: '92 heures', 61: '61 heures', 74: '74 heures', 95: '95 heures',
      }

    },
    native_country: {
      label: "Pays d\'origine",
      values: {
        'United-States': 'États-Unis', 'Cuba': 'Cuba', 'Jamaica': 'Jamaïque', 'India': 'Inde',
        '?': '?', 'Mexico': 'Mexique', 'South': 'Sud', 'Puerto-Rico': 'Porto Rico',
        'Honduras': 'Honduras', 'England': 'Angleterre', 'Canada': 'Canada',
        'Germany': 'Allemagne', 'Iran': 'Iran', 'Philippines': 'Philippines',
        'Italy': 'Italie', 'Poland': 'Pologne', 'Columbia': 'Colombie',
        'Cambodia': 'Cambodge', 'Thailand': 'Thaïlande', 'Ecuador': 'Équateur',
        'Laos': 'Laos', 'Taiwan': 'Taïwan', 'Haiti': 'Haïti', 'Portugal': 'Portugal',
        'Dominican-Republic': 'République dominicaine', 'El-Salvador': 'El Salvador',
        'France': 'France', 'Guatemala': 'Guatemala', 'China': 'Chine',
        'Japan': 'Japon', 'Yugoslavia': 'Yougoslavie', 'Peru': 'Pérou',
        'Outlying-US(Guam-USVI-etc)': 'Territoires extérieurs des États-Unis (Guam-USVI-etc)',
        'Scotland': 'Écosse', 'Trinadad&Tobago': 'Trinité-et-Tobago', 'Greece': 'Grèce',
        'Nicaragua': 'Nicaragua', 'Vietnam': 'Vietnam', 'Hong': 'Hong Kong',
        'Ireland': 'Irlande', 'Hungary': 'Hongrie', 'Holand-Netherlands': 'Pays-Bas'
      }

    }
  };
  client: any[];
  client2: any[];
  card:any[];
  isEligible: boolean
  selectedFiles: FileList;
  currentFile: any;
  user: User;
  credit: Credit;
  creditref: Creditrefuse
  produit: Produit;
  creidtform: FormGroup;
  clientform: FormGroup;
  clientform2: FormGroup;
  combinedForm:FormGroup;
  clienteleigibiliteform: FormGroup
  isDisabled: boolean = true;
  uisReaydu: boolean = false;
  uisReaydp: boolean = false;
  step0valid:boolean = false;
  step1valid:boolean = false;
  step2valid:boolean = false;
  step3valid:boolean = false;
  magasin:Magasin;
  spinn:boolean=false;
  spinn1:boolean=false;
  spinn2:boolean=false;
  ismagasinReady:boolean=false;
  constructor(private _formBuilder: FormBuilder, private us: UserServiceService, private router: ActivatedRoute, private route: Router,
    private cs: CreditServiceService, private ps: ProduitServiceService,private ms:MagasinServiceService,
    private dj: DjangoService, private crs: CreditrefuseService) { }
  ngOnInit(): void {
    this.getuserbyid();
    this.getproduitbyid();
    this.clienteleigibiliteinitform();
    this.getmagasin();



  }
  
  initform(data) {
    this.clientform = this._formBuilder.group({
      nom: [data[5], Validators.required],
      prenom: [data[10], Validators.required],
      email: ['', [Validators.required,Validators.email]]
    });


    this.clientform.valueChanges.subscribe(data => {
      console.log(this.clientform.value);
    });
  }
  initform2(data) {
    const concatenatedString = `${data[7]}${data[8]}${data[9]}${data[10]}`;
    this.clientform2 = this._formBuilder.group({
      adresse: [concatenatedString, Validators.required],
    });


    this.clientform.valueChanges.subscribe(data => {
      console.log(this.clientform.value);
    });
  }
  initCombinedForm(data1, data2) {
    //   const concatenatedString = `${data2[7]}${data2[8]}${data2[9]}${data2[10]}`;
    // console.log(data1)
    // console.log(data2)
    this.combinedForm = this._formBuilder.group({
      adresse: [this.clientform2.get('adresse')?.value, Validators.required],
      nom: [this.clientform.get('nom')?.value, Validators.required],
      prenom: [this.clientform.get('prenom')?.value, Validators.required], // Utilisez data2 pour le prénom
      email: [this.clientform.get('email')?.value, [Validators.required, Validators.email]]
    });
  
    this.combinedForm.valueChanges.subscribe(data => {
      console.log(this.combinedForm.value);
    });
  }
  agentform: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  creditform() {
    console.log(this.produit)
    console.log(this.uisReaydp)
    this.creidtform = this._formBuilder.group({
      montant: [this.produit.prix, Validators.required],
      nbrdumois: ['', Validators.required],
      iban:['', Validators.required]

    });
    this.creidtform.valueChanges.subscribe(
      data => {
        console.log(this.creidtform.value);

      }
    )
  }
  clienteleigibiliteinitform() {
    this.clienteleigibiliteform = this._formBuilder.group({
      age: ['', [Validators.required]],
      workclass: ['', [Validators.required]],
      education: ['', [Validators.required]],
      education_num: ['', [Validators.required]],
      marital_status: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      relationship: ['', [Validators.required]],
      race: ['', ],
      gender: ['', ],
      capital_gain: ['', [Validators.required]],
      capital_loss: ['', [Validators.required]],
      hours_per_week: ['', [Validators.required]],
      native_country: ['', [Validators.required]],

      // ... Other form controls
    });
    this.clienteleigibiliteform.valueChanges.subscribe((data) => {


      // Update specific form controls with trimmed value
      const formControlsToUpdate = ['workclass', 'education', 'marital_status', 'occupation', 'relationship', 'race', 'gender', 'native_country']; // Add more controls as needed
      for (const controlName of formControlsToUpdate) {
        const controlValue = this.clienteleigibiliteform.get(controlName)?.value;
        if (controlValue) {
          this.clienteleigibiliteform.get(controlName)?.setValue(controlValue.trim(), { emitEvent: false });
        }
      }
    });

    this.clienteleigibiliteform.valueChanges.subscribe(
      data => {
        console.log(this.clienteleigibiliteform.value);

      }
    )
  }




  checkEligibility(): void {
    const formValues = this.clienteleigibiliteform.value;
    const controlsWithSpace = ['workclass', 'education', 'marital_status', 'occupation', 'relationship', 'race', 'gender', 'native_country'];

    for (const controlName of controlsWithSpace) {
      const controlValue = formValues[controlName];
      if (typeof controlValue === 'string' && controlValue.trim() !== '') {
        formValues[controlName] = ' ' + controlValue.trim();
      }
    }

    // Now you can use the modified formValues as needed
    console.log(formValues);
    this.dj.checkEligibility(this.clienteleigibiliteform.value).subscribe(
      (response) => {
        // Access the 'eligibilite' field and store it as a boolean variable
        this.isEligible = response.eligibilite;

        // Now you can use 'isEligible' in your application logic
        console.log('Is eligible:', this.isEligible);
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
    this.step3valid=true;
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  getuserinfo() {
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
    this.spinn=true;
    this.dj.upload(this.currentFile).subscribe(
      data => {

        console.log(data)
        this.client = data;

        this.initform(data);
        this.step0valid=true;
        this.spinn=false

      }
    )

  }
  getcardinfo() {
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
    this.spinn2=true;
    this.dj.upload(this.currentFile).subscribe(
      data => {
        console.log(data)
        this.card = data;

          this.creidtform.patchValue({
            iban: data[4]  // Assuming this.card contains the IBAN text
          });
          this.step2valid=true;
          this.spinn2=false;
        }
    );
        

  }
  getuserinfo2() {
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
    this.spinn1=true;
    this.dj.upload(this.currentFile).subscribe(
      data => {
        console.log(data)
        this.client2 = data;

        this.initform2(data);
        this.initCombinedForm(this.clientform.value,this.clientform2.value);
        this.step1valid=true;
        this.spinn1=false;
      }
    )

  }
  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwt_decode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        console.log(data)
        this.user = data;
        this.uisReaydu = true;

      }
    )
  }
  getproduitbyid() {
    this.ps.getProduitById(this.router.snapshot.params['id']).subscribe(
      data => {
        console.log(this.router.snapshot.params['id'])
        this.produit = data;
        this.uisReaydp = true;
        this.creditform();

      }
    )
  }
  getmagasin(){
    this.ms.getMagasinByproduit(this.router.snapshot.params['id']).subscribe(
      data=>{
        this.magasin=data;
        this.ismagasinReady=true;
      }
    )
  }
  submit() {
    this.cs.ajoutCredit(this.creidtform.value).subscribe(
      data => {
        this.credit = data;
        console.log(data.creditId)
        console.log(this.user.id)
        this.cs.affectecreditagent(data.creditId, this.user.id, data).subscribe(
          res => {

            console.log(res)
            console.log(this.clientform.value)
            console.log(this.combinedForm.value)
            this.us.ajoutclient(this.combinedForm.value).subscribe(
              res => {
                this.cs.affectecreditclient(data.creditId, res.id, data).subscribe(
                  res => {
                    console.log(this.produit.produitId)
                    this.cs.affectecreditproduit(data.creditId, this.produit.produitId, data).subscribe(
                      res => {

                      }
                    )
                  }
                )
              }
            )

          }
        )

        this.route.navigate(['/affichlistProduits'])
      }
    )
  }
  submitr() {
    this.crs.ajoutCredit(this.creidtform.value).subscribe(
      data => {
        this.creditref = data;

        this.crs.affectecreditagent(data.creditId, this.user.id, data).subscribe(
          res => {
            console.log(data.creditId)
            console.log(this.user.id)
            this.us.ajoutclient(this.combinedForm.value).subscribe(
              res => {
                this.crs.affectecreditclient(data.creditId, res.id, data).subscribe(
                  resu => {
                    console.log(data.creditId)
                    console.log(res.id)
                    console.log(this.produit.produitId)
                    this.crs.affectecreditproduit(data.creditId, this.produit.produitId, data).subscribe(
                      resul => {
                        console.log(data.creditId)
                        console.log(this.produit.produitId)
                      }
                    )
                  }
                )
              }
            )
          }
        )


        this.route.navigate(['/affichlistProduits'])
      }
    )
  }
}
