/*
  SAÜ Mezun Bilgi Sistemi — veri katmanı
  ------------------------------------------------------------
  • window.MEZUN_VERI (assets/veri.js) doluysa onu kullanır.
  • Boşsa aşağıdaki ÖRNEK veri üreteciyle (sabit tohumlu, her açılışta aynı)
    Sakarya Üniversitesi'nin gerçek birim/program adlarıyla SENTETİK sayılar üretir.
  Örnek sayılar gerçek değildir; yalnızca arayüzü göstermek içindir.
*/
(function(){
  "use strict";

  // ---- 81 il: [ad, enlem, boylam, nüfus(bin)] ----
  const ILLER = [
    ["Adana",37.00,35.32,2270],["Adıyaman",37.76,38.28,610],["Afyonkarahisar",38.76,30.54,750],["Ağrı",39.72,43.05,510],
    ["Amasya",40.65,35.83,340],["Ankara",39.93,32.86,5800],["Antalya",36.90,30.70,2700],["Artvin",41.18,41.82,170],
    ["Aydın",37.85,27.85,1160],["Balıkesir",39.65,27.88,1270],["Bilecik",40.14,29.98,230],["Bingöl",38.88,40.50,280],
    ["Bitlis",38.40,42.11,360],["Bolu",40.73,31.61,320],["Burdur",37.72,30.29,275],["Bursa",40.19,29.06,3200],
    ["Çanakkale",40.15,26.41,560],["Çankırı",40.60,33.61,200],["Çorum",40.55,34.95,525],["Denizli",37.78,29.09,1060],
    ["Diyarbakır",37.91,40.23,1820],["Edirne",41.68,26.56,415],["Elazığ",38.68,39.22,600],["Erzincan",39.75,39.49,240],
    ["Erzurum",39.90,41.27,750],["Eskişehir",39.78,30.52,920],["Gaziantep",37.07,37.38,2160],["Giresun",40.91,38.39,450],
    ["Gümüşhane",40.46,39.48,145],["Hakkari",37.58,43.74,290],["Hatay",36.40,36.35,1550],["Isparta",37.76,30.55,450],
    ["Mersin",36.80,34.64,1930],["İstanbul",41.01,28.98,15700],["İzmir",38.42,27.14,4480],["Kars",40.60,43.10,275],
    ["Kastamonu",41.38,33.78,380],["Kayseri",38.73,35.48,1450],["Kırklareli",41.73,27.22,370],["Kırşehir",39.15,34.16,245],
    ["Kocaeli",40.77,29.94,2100],["Konya",37.87,32.48,2320],["Kütahya",39.42,29.98,580],["Malatya",38.35,38.31,740],
    ["Manisa",38.61,27.43,1470],["Kahramanmaraş",37.58,36.94,1120],["Mardin",37.31,40.74,870],["Muğla",37.22,28.36,1050],
    ["Muş",38.75,41.50,400],["Nevşehir",38.62,34.71,310],["Niğde",37.97,34.68,370],["Ordu",40.98,37.88,770],
    ["Rize",41.02,40.52,350],["Sakarya",40.78,30.40,1110],["Samsun",41.29,36.33,1380],["Siirt",37.93,41.94,330],
    ["Sinop",42.03,35.15,225],["Sivas",39.75,37.02,640],["Tekirdağ",40.98,27.51,1170],["Tokat",40.31,36.55,600],
    ["Trabzon",41.00,39.72,820],["Tunceli",39.11,39.55,85],["Şanlıurfa",37.16,38.79,2200],["Uşak",38.68,29.41,375],
    ["Van",38.49,43.38,1130],["Yozgat",39.82,34.81,420],["Zonguldak",41.45,31.79,590],["Aksaray",38.37,34.03,440],
    ["Bayburt",40.26,40.23,85],["Karaman",37.18,33.22,260],["Kırıkkale",39.85,33.51,280],["Batman",37.88,41.13,640],
    ["Şırnak",37.52,42.46,560],["Bartın",41.63,32.34,205],["Ardahan",41.11,42.70,92],["Iğdır",39.92,44.04,205],
    ["Yalova",40.65,29.27,300],["Karabük",41.20,32.62,250],["Kilis",36.72,37.12,155],["Osmaniye",37.07,36.25,560],
    ["Düzce",40.84,31.16,410]
  ];

  // ---- SAÜ akademik birimleri (sakarya.edu.tr/aboutus/akademikbirimler, Ekim 2026) ----
  // program: [ad, tür, başlangıç yılı, kadın oranı, yıllık ölçek]
  const L="Lisans", OL="Ön Lisans", LU="Lisansüstü";
  const BIRIMLER = [
    {grup:"Fakülteler", ad:"Mühendislik Fakültesi", p:[
      ["Çevre Mühendisliği",L,1996,.48,55],["Elektrik-Elektronik Mühendisliği",L,1993,.18,150],["Endüstri Mühendisliği",L,1993,.45,130],
      ["Gıda Mühendisliği",L,2006,.70,50],["İnşaat Mühendisliği",L,1993,.22,150],["Jeofizik Mühendisliği",L,1996,.30,40],
      ["Kimya Mühendisliği",L,1996,.50,55],["Makine Mühendisliği",L,1993,.08,170],["Metalurji ve Malzeme Mühendisliği",L,1993,.25,80]]},
    {grup:"Fakülteler", ad:"Bilgisayar ve Bilişim Bilimleri Fakültesi", p:[
      ["Bilgisayar Mühendisliği",L,1993,.20,120],["Bilişim Sistemleri Mühendisliği",L,2013,.25,60],
      ["Yazılım Mühendisliği",L,2016,.22,70],["Yönetim Bilişim Sistemleri",L,2013,.45,90]]},
    {grup:"Fakülteler", ad:"Fen Fakültesi", p:[
      ["Biyoloji",L,1996,.66,45],["Fizik",L,1996,.42,35],["Kimya",L,1996,.58,45],["Matematik",L,1996,.55,60]]},
    {grup:"Fakülteler", ad:"Tıp Fakültesi", p:[["Tıp",L,2016,.52,150]]},
    {grup:"Fakülteler", ad:"Diş Hekimliği Fakültesi", p:[["Diş Hekimliği",L,2020,.58,60]]},
    {grup:"Fakülteler", ad:"Sağlık Bilimleri Fakültesi", p:[
      ["Hemşirelik",L,2007,.80,160],["Ebelik",L,2013,1,70],["Fizyoterapi ve Rehabilitasyon",L,2015,.70,60],
      ["Beslenme ve Diyetetik",L,2016,.85,50],["Sosyal Hizmet",L,2014,.70,80]]},
    {grup:"Fakülteler", ad:"Hukuk Fakültesi", p:[["Hukuk",L,2011,.50,220]]},
    {grup:"Fakülteler", ad:"Eğitim Fakültesi", p:[
      ["Sınıf Öğretmenliği",L,1998,.66,120],["Türkçe Öğretmenliği",L,1998,.68,80],["Sosyal Bilgiler Öğretmenliği",L,1998,.55,80],
      ["İlköğretim Matematik Öğretmenliği",L,1998,.68,80],["Fen Bilgisi Öğretmenliği",L,1998,.72,70],["Okul Öncesi Öğretmenliği",L,2000,.92,80],
      ["Rehberlik ve Psikolojik Danışmanlık",L,2000,.70,90],["İngilizce Öğretmenliği",L,2005,.70,60],
      ["Özel Eğitim Öğretmenliği",L,2012,.75,40],["Bilgisayar ve Öğretim Teknolojileri Öğretmenliği",L,1999,.40,50]]},
    {grup:"Fakülteler", ad:"İnsan ve Toplum Bilimleri Fakültesi", p:[
      ["Türk Dili ve Edebiyatı",L,1996,.65,80],["Tarih",L,1996,.45,80],["Coğrafya",L,2005,.45,50],
      ["Sosyoloji",L,1998,.62,70],["Psikoloji",L,2012,.75,60],["Felsefe",L,2011,.50,35]]},
    {grup:"Fakülteler", ad:"İşletme Fakültesi", p:[
      ["İşletme",L,1993,.50,260],["Uluslararası Ticaret",L,2010,.52,80],["Turizm İşletmeciliği",L,2012,.48,50]]},
    {grup:"Fakülteler", ad:"Siyasal Bilgiler Fakültesi", p:[
      ["Çalışma Ekonomisi ve Endüstri İlişkileri",L,1993,.50,150],["İktisat",L,1993,.45,170],["Maliye",L,1993,.48,140],
      ["Siyaset Bilimi ve Kamu Yönetimi",L,1993,.46,170],["Uluslararası İlişkiler",L,1998,.50,100],
      ["Ekonometri",L,1998,.48,60],["İnsan Kaynakları Yönetimi",L,2017,.62,80]]},
    {grup:"Fakülteler", ad:"İlahiyat Fakültesi", p:[
      ["İlahiyat",L,1993,.60,180],["İlköğretim Din Kültürü ve Ahlak Bilgisi Öğretmenliği",L,1998,.65,50]]},
    {grup:"Fakülteler", ad:"İletişim Fakültesi", p:[
      ["Gazetecilik",L,2004,.52,60],["Halkla İlişkiler ve Tanıtım",L,2004,.60,60],["Radyo, Televizyon ve Sinema",L,2004,.45,60]]},
    {grup:"Fakülteler", ad:"Sanat Tasarım ve Mimarlık Fakültesi", p:[
      ["Mimarlık",L,2012,.60,60],["Grafik Tasarımı",L,2003,.58,40],["Resim",L,2003,.62,30],["Seramik ve Cam",L,2010,.70,20]]},
    {grup:"Fakülteler", ad:"Teknik Eğitim Fakültesi", p:[
      ["Makine Eğitimi",L,1993,.05,90],["Elektrik Eğitimi",L,1993,.05,80],["Metal Eğitimi",L,1993,.05,70],["Yapı Eğitimi",L,1993,.10,60]]},
    {grup:"Enstitüler", ad:"Fen Bilimleri Enstitüsü", p:[
      ["Bilgisayar ve Bilişim Mühendisliği (YL)",LU,1996,.25,40],["Makine Mühendisliği (YL)",LU,1994,.10,35],
      ["Elektrik-Elektronik Mühendisliği (YL)",LU,1994,.20,30],["İnşaat Mühendisliği (YL)",LU,1994,.25,35],
      ["Endüstri Mühendisliği (YL)",LU,1996,.40,35],["Kimya (YL)",LU,1998,.60,15],["Matematik (YL)",LU,1998,.55,15],
      ["Metalurji ve Malzeme Mühendisliği (Doktora)",LU,2000,.25,10]]},
    {grup:"Enstitüler", ad:"Sosyal Bilimler Enstitüsü", p:[
      ["Çalışma Ekonomisi ve Endüstri İlişkileri (YL)",LU,1996,.50,25],["Çalışma Ekonomisi ve Endüstri İlişkileri (Doktora)",LU,2002,.45,8],
      ["İktisat (YL)",LU,1996,.42,20],["Kamu Yönetimi (YL)",LU,1996,.45,25],["Tarih (YL)",LU,1998,.45,15],
      ["Türk Dili ve Edebiyatı (YL)",LU,1998,.60,15],["İnsan Kaynakları Yönetimi (YL)",LU,2010,.60,30],
      ["Uluslararası İlişkiler (YL)",LU,2004,.45,15]]},
    {grup:"Enstitüler", ad:"İşletme Enstitüsü", p:[
      ["İşletme (Tezli YL)",LU,2015,.48,40],["İşletme (Tezsiz YL)",LU,2015,.45,90],["Muhasebe ve Finansman (YL)",LU,2015,.50,20],
      ["Üretim Yönetimi ve Pazarlama (YL)",LU,2015,.45,15],["İşletme (Doktora)",LU,2015,.40,10]]},
    {grup:"Enstitüler", ad:"Eğitim Bilimleri Enstitüsü", p:[
      ["Eğitim Yönetimi (YL)",LU,2013,.45,40],["Rehberlik ve Psikolojik Danışmanlık (YL)",LU,2013,.70,20],["İlköğretim (YL)",LU,2013,.65,20]]},
    {grup:"Enstitüler", ad:"Orta Doğu Enstitüsü", p:[["Orta Doğu Çalışmaları (YL)",LU,2014,.35,25],["Orta Doğu Çalışmaları (Doktora)",LU,2016,.30,8]]},
    {grup:"Enstitüler", ad:"Sağlık Bilimleri Enstitüsü", p:[["Hemşirelik (YL)",LU,2012,.85,15],["Anatomi (YL)",LU,2014,.55,6],["Fizyoloji (YL)",LU,2014,.55,6]]},
    {grup:"Konservatuvarlar", ad:"Devlet Konservatuvarı", p:[["Türk Müziği",L,2003,.45,30],["Türk Halk Oyunları",L,2008,.50,25]]},
    {grup:"Meslek Yüksekokulları", ad:"Adalet Meslek Yüksekokulu", p:[["Adalet",OL,2011,.55,220],["Adalet (İ.Ö.)",OL,2012,.50,120]]},
    {grup:"Meslek Yüksekokulları", ad:"Adapazarı Meslek Yüksekokulu", p:[
      ["Bilgisayar Programcılığı",OL,1993,.30,90],["Muhasebe ve Vergi Uygulamaları",OL,1993,.55,90],["Elektrik",OL,1993,.03,70],
      ["Makine",OL,1993,.03,70],["Lojistik",OL,2012,.35,60],["İşletme Yönetimi",OL,1995,.52,70]]},
    {grup:"Meslek Yüksekokulları", ad:"Sağlık Hizmetleri Meslek Yüksekokulu", p:[
      ["Tıbbi Görüntüleme Teknikleri",OL,2010,.55,60],["Tıbbi Laboratuvar Teknikleri",OL,2010,.70,60],["İlk ve Acil Yardım",OL,2010,.60,70],
      ["Anestezi",OL,2012,.62,60],["Ağız ve Diş Sağlığı",OL,2016,.75,40],["Fizyoterapi",OL,2012,.70,50]]}
  ];

  const ULKELER = [["Azerbaycan",34],["Türkmenistan",12],["Suriye",14],["Afganistan",9],["Kazakistan",8],["Irak",8],["Somali",7],
    ["Filistin",6],["Mısır",5],["Yemen",5],["Kırgızistan",5],["İran",4],["Sudan",4],["Bosna-Hersek",4],["Kosova",3],
    ["Almanya",3],["Gürcistan",3],["Endonezya",3],["Pakistan",3],["Ürdün",2],["Libya",2],["Nijerya",2],["Kenya",1],["Moğolistan",1]];

  const SEKTORLER = [["Kamu / Devlet",24],["Eğitim",17],["Sanayi / Üretim",14],["Sağlık",9],["Mühendislik / Teknik",9],
    ["Finans / Bankacılık",6],["Bilişim / Yazılım",7],["Ticaret / Satış",5],["Hukuk",4],["Serbest Meslek",3],["Otomotiv",2]];

  // ---- deterministik rastgele ----
  function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  const rnd = mulberry32(20261015);
  const gauss = () => (rnd()+rnd()+rnd()-1.5)/1.5;

  function orneKUret(){
    const GUNCEL = 2026;
    const birimler = BIRIMLER.map(b => ({grup:b.grup, ad:b.ad, programlar: b.p.map(([ad,tur,bas,kOran,olcek]) => {
      const yillar = {};
      const ilkMezun = bas + (tur===OL?2:tur===LU?2:4);
      for(let y=Math.max(ilkMezun,1995); y<=GUNCEL; y++){
        const buyume = Math.min(1, 0.45 + (y-ilkMezun)*0.08);
        let n = Math.round(olcek * buyume * (1 + gauss()*0.18));
        if(y===GUNCEL) n = Math.round(n*0.92);
        n = Math.max(0,n);
        const kp = Math.min(1,Math.max(0,kOran + gauss()*0.05));
        const k = Math.round(n*kp);
        yillar[y] = [k, n-k];
      }
      return {ad, tur, yillar};
    })}));

    // toplamlar
    let T=[0,0], G=[0,0];
    birimler.forEach(b=>b.programlar.forEach(p=>Object.entries(p.yillar).forEach(([y,[k,e]])=>{T[0]+=k;T[1]+=e; if(+y===GUNCEL){G[0]+=k;G[1]+=e;}})));

    // il dağılımı: nüfus ve Sakarya'ya uzaklık ağırlıklı (yalnızca örnek)
    const [_, sLat, sLon] = ILLER.find(i=>i[0]==="Sakarya");
    const agirlik = ILLER.map(([ad,la,lo,nf])=>{
      const d = Math.hypot((la-sLat)*111,(lo-sLon)*85);
      let w = Math.pow(nf,0.85)*Math.exp(-d/380);
      if(ad==="Sakarya") w*=9; if(ad==="Kocaeli"||ad==="Düzce"||ad==="Bilecik"||ad==="Bolu") w*=1.4;
      return w*(0.85+rnd()*0.3);
    });
    const ws = agirlik.reduce((a,b)=>a+b,0);
    const ilKapsam = 0.965; // ili kayıtlı mezun oranı
    const iller = {};
    ILLER.forEach(([ad],i)=>{
      const p = agirlik[i]/ws, kp = 0.5 + gauss()*0.04;
      const top = Math.round((T[0]+T[1])*ilKapsam*p), g = Math.round((G[0]+G[1])*ilKapsam*p);
      iller[ad] = [Math.round(top*kp), top-Math.round(top*kp), Math.round(g*kp), g-Math.round(g*kp)];
    });

    // uluslararası
    const tumProg = []; birimler.forEach(b=>b.programlar.forEach(p=>tumProg.push([b.ad,p.ad,p.tur,b.grup])));
    const uluslararasiToplam = Math.round((T[0]+T[1])*0.028);
    const uws = ULKELER.reduce((a,u)=>a+u[1],0);
    const ulkeler = ULKELER.map(([ulke,w])=>{
      const n = Math.max(1,Math.round(uluslararasiToplam*w/uws*(0.85+rnd()*0.3)));
      const kayit = {}; let K=0,E=0, tur={}; const buYil=[0,0];
      for(let i=0;i<n;i++){
        const pr = tumProg[Math.floor(Math.pow(rnd(),1.6)*tumProg.length)];
        const kad = rnd()<0.32;
        const key = pr[0]+"||"+pr[1];
        kayit[key] = kayit[key] || {birim:pr[0], program:pr[1], tur:pr[2], K:0, E:0};
        kad ? (kayit[key].K++,K++) : (kayit[key].E++,E++);
        tur[pr[2]] = tur[pr[2]]||[0,0]; tur[pr[2]][kad?0:1]++;
        if(rnd()<0.07) buYil[kad?0:1]++;
      }
      return {ulke, K, E, tur, buYil, programlar:Object.values(kayit).sort((a,b)=>(b.K+b.E)-(a.K+a.E))};
    }).sort((a,b)=>(b.K+b.E)-(a.K+a.E));

    const sektorBeyan = 512;
    const sws = SEKTORLER.reduce((a,s)=>a+s[1],0);
    const sektorler = SEKTORLER.map(([ad,w])=>[ad,Math.round(sektorBeyan*w/sws)]);

    return {ornek:true, guncellenme:"2026-10-15", guncelYil:GUNCEL, birimler, iller, ulkeler,
            sektorler, sektorBeyan: sektorler.reduce((a,s)=>a+s[1],0), kayitliMezun: 1834};
  }

  const V = window.MEZUN_VERI || orneKUret();
  V.ornek = !window.MEZUN_VERI;
  V.ilKoordinat = Object.fromEntries(ILLER.map(([ad,la,lo])=>[ad,[la,lo]]));

  // ---- Türetilmiş yardımcılar ----
  V.toplam = function(filtre){ // filtre: {grup, birim, program, yil}
    let K=0,E=0;
    V.birimler.forEach(b=>{
      if(filtre&&filtre.grup&&b.grup!==filtre.grup) return;
      if(filtre&&filtre.birim&&b.ad!==filtre.birim) return;
      b.programlar.forEach(p=>{
        if(filtre&&filtre.program&&p.ad!==filtre.program) return;
        if(filtre&&filtre.tur&&p.tur!==filtre.tur) return;
        Object.entries(p.yillar).forEach(([y,[k,e]])=>{ if(filtre&&filtre.yil&&+y!==filtre.yil) return; K+=k;E+=e; });
      });
    });
    return {K,E,T:K+E};
  };
  V.yilSerisi = function(filtre){
    const m = {};
    V.birimler.forEach(b=>{
      if(filtre&&filtre.birim&&b.ad!==filtre.birim) return;
      b.programlar.forEach(p=>{
        if(filtre&&filtre.program&&p.ad!==filtre.program) return;
        Object.entries(p.yillar).forEach(([y,[k,e]])=>{ m[y]=m[y]||[0,0]; m[y][0]+=k; m[y][1]+=e; });
      });
    });
    return Object.keys(m).sort().map(y=>({yil:+y,K:m[y][0],E:m[y][1],T:m[y][0]+m[y][1]}));
  };
  V.gruplar = function(){ return [...new Set(V.birimler.map(b=>b.grup))]; };

  // ---- Örnek içerikler (Mezun Köşesi ve Duyurular) ----
  V.kose = window.MEZUN_KOSE || [
    {id:1, tur:"BasariHikayesi", baslik:"Esentepe'den Otomotiv Ar-Ge'ye", ozet:"Makine mühendisliği eğitimimin ardından bölgedeki otomotiv sanayisinde Ar-Ge mühendisi olarak çalışmaya başladım.",
     yazar:"Örnek Mezun A", program:"Makine Mühendisliği", yil:2016, tarih:"2026-10-02", goruntulenme:214, vitrin:true,
     govde:["Bu içerik, Mezun Köşesi detay sayfasının nasıl görüneceğini göstermek için yazılmış ÖRNEK bir metindir.","Gerçek sistemde mezunlar giriş yaptıktan sonra kendi hikâyelerini gönderir; içerikler birim tarafından değerlendirildikten sonra yayımlanır.","Metin; eğitim yılları, mezuniyet sonrası kariyer yolu ve öğrencilere öneriler gibi bölümlerden oluşabilir."]},
    {id:2, tur:"BasariHikayesi", baslik:"Çalışma Ekonomisinden İnsan Kaynakları Direktörlüğüne", ozet:"Siyasal Bilgiler'de aldığım endüstri ilişkileri eğitimi, bugün yürüttüğüm İK süreçlerinin temelini oluşturdu.",
     yazar:"Örnek Mezun B", program:"Çalışma Ekonomisi ve Endüstri İlişkileri", yil:2009, tarih:"2026-09-28", goruntulenme:187, vitrin:true,
     govde:["ÖRNEK içerik. Mezunun lisans döneminde edindiği bilgi ve becerilerin kariyerine nasıl yansıdığını anlatan bir başarı hikâyesi burada yer alır.","Görsel, mezunun profil fotoğrafı ve yayım tarihi gibi alanlar otomatik olarak doldurulur."]},
    {id:3, tur:"BasariHikayesi", baslik:"Bilgisayar Mühendisliğinden Kendi Girişimime", ozet:"Teknokent'te başlayan yazılım girişimimiz bugün yurt dışına hizmet veriyor.",
     yazar:"Örnek Mezun C", program:"Bilgisayar Mühendisliği", yil:2014, tarih:"2026-09-20", goruntulenme:301, vitrin:true,
     govde:["ÖRNEK içerik. Girişimcilik yolculuğunu anlatan mezun hikâyeleri, öğrencilere rol model sunar.","Mezun Vitrini'nde öne çıkarılan içerikler bu sayfadan seçilir."]},
    {id:4, tur:"Yazi", baslik:"Hukuk Fakültesi Mezun Görüşü", ozet:"Fakültemizde geçirdiğim dört yıl, mesleğe hazırlıkta güçlü bir zemin sağladı.",
     yazar:"Örnek Mezun D", program:"Hukuk", yil:2023, tarih:"2026-09-12", goruntulenme:96,
     govde:["ÖRNEK içerik. 'Yazı' türündeki içerikler mezunların görüş ve deneyimlerini paylaştığı kısa yazılardır."]},
    {id:5, tur:"Etkinlik", baslik:"Mezunlar Buluşması — Esentepe Kampüsü", ozet:"Farklı kuşaklardan mezunlarımızı kampüste bir araya getiren buluşma (örnek etkinlik).",
     yazar:"Mezun İlişkileri", program:"—", yil:null, tarih:"2026-09-05", goruntulenme:142,
     govde:["ÖRNEK etkinlik duyurusu. Tarih, yer ve kayıt bilgileri burada yer alır."]},
    {id:6, tur:"IsIlani", baslik:"Mezunumuzdan İlan: Yazılım Geliştirici (Junior)", ozet:"Mezunlarımızın kurumlarındaki açık pozisyonları buradan paylaşabilirsiniz (örnek ilan).",
     yazar:"Örnek Mezun C", program:"Bilgisayar Mühendisliği", yil:2014, tarih:"2026-08-30", goruntulenme:233,
     govde:["ÖRNEK iş ilanı. Pozisyon, nitelikler ve başvuru yöntemi burada yer alır."]}
  ];
  V.duyurular = window.MEZUN_DUYURU || [
    {baslik:"Mezun Bilgi Sistemi tanıtım videosu yayında", tarih:"2026-10-10", yeni:true,
     govde:["Değerli mezunlarımız,","Mezun Bilgi Sistemi'ni daha kolay kullanabilmeniz için kısa bir tanıtım videosu hazırlanmıştır. Sisteme ilk kez giriş yapacaksanız izlemenizi öneririz. (Örnek duyuru)"]},
    {baslik:"Mezun Bilgi Sistemimiz yayında", tarih:"2026-10-01", yeni:true,
     govde:["Değerli mezunlarımız,","Sakarya Üniversitesi Mezun Bilgi Sistemi, mezunlarımızla iletişimin sürekliliğini sağlamak ve mezunlara sunulan hizmetleri tek adreste toplamak amacıyla kullanıma açılmıştır.","Giriş yaptığınızda iletişim ve çalışma bilgilerinizi güncelleyebilir, Mezun Vitrini'nde yer alabilir, mezun anketlerine katılabilir ve Mezun Köşesi'ne içerik gönderebilirsiniz. Gönderiler değerlendirildikten sonra yayımlanır.","Profil bilgilerinin güncel tutulması, duyuru ve hizmetlerin doğru kişilere ulaşmasını ve mezun izleme çalışmalarının sağlıklı yürütülmesini sağlar. (Örnek duyuru)"]},
    {baslik:"2026 Mezun Memnuniyet ve İstihdam Anketi başladı", tarih:"2026-09-15", yeni:false,
     govde:["Program akreditasyonu ve kalite güvencesi çalışmalarına katkı sunmak amacıyla hazırlanan mezun anketine sisteme giriş yaparak katılabilirsiniz. (Örnek duyuru)"]}
  ];

  window.MEZUN = V;
})();
