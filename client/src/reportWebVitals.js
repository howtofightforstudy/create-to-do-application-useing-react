/*web performans verilerini toplamak ve ölçmek için kullanılır
web sayfasının yüklenme hızını, etkileşim hızını ve genel performansını ölçmek için kullanılır*/

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) //parametre fonskiyon mu diye kontrol eder
  {
    //web-vitals: web-vitals kütüphanesinin dinamik olarak yüklenmesini sağlar
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); //sayfanın yüklenme sırasın görsel içeriği kaymasının toplam miktarını ölçer.
      getFID(onPerfEntry); // kullanıcının sayfadaki ilk etkileşimine (tıklama vb) yanıt verme süresini ölçer. 
      getFCP(onPerfEntry); // kullanıcının ilk içerikli öğeyi (metin veya grafik vb) görene kadar geçen süreyi ölçer.
      getLCP(onPerfEntry); // sayfadaki en büyük içerik parçasının (büyük bir resim veya metin bloğu vb) görünür hale gelene kadar geçen süreyi ölçer.
      getTTFB(onPerfEntry); // sunucunun ilk baytı göndermeye başladığı süreyi ölçer
    });
  }
};

export default reportWebVitals;
