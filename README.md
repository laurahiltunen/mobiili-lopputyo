# mobiili-lopputyo
Mobiiliohjelmointi -kurssin lopputyö (ReactNative ja Expo)

Loppuprojekti on reseptisovellus, jossa käyttäjä voi etsiä reseptejä rest API -rajapinnasta ja tallentaa tietokantaan ne reseptit, joihin hän haluaa palata myöhemmin. 

Reseptihaku toimii hakemalla reseptiti RecipePuppy - reseptihakukoneen API:sta.
Haetut reseptit käydään läpi Flatlistin avulla, joka myös näyttää sovelluksessa haetut reseptit.
Haetut reseptit voidaan tallentaa tietokantaan ja tarkastella niitä myöhemmin.

Tallennettuja reseptejä voidaan poistaa ja niiden tietoja voidaan tarkastella tarkemmin Alert -komponentin (React Native API) avulla.
Toinen sovelluksessa käytetty React Native API on Vibrate, jolla saadaan puhelin tärisemään. Se on vain viihdykkeeksi, eikä varsinaisesti liity sovelluksen toimintaan.
Sovelluksessa on käytetty seuraavia React Native komponentteja: Flatlist, TextInput ja Image
React Native Elements komponentteja ovat: Button, Icon ja Text
Lisäksi sovelluksessa on käytetty Stack Navigaatiota.
