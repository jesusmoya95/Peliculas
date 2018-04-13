// Variables
var numero_pelis = 0;
var titulo = "";
var tipo = "";
var pag = 1;
var fin = false;
var en_curso = false;
var parar = false;
var categoria = "";



function eventoEnter(e){
    if (e.keyCode == 13){
        buscar_peli();
    }
}


function buscar_peli(){
    $("#cuerpo_pelis").show();
    $("#cuerpo_pelis").empty();
    $("#portada_home").hide();

    parar = false;
    titulo = $("#busqueda").val();
    tipo = $("#tipo").val();
    numero_pelis = 0;
    pag = 1;
    pagina = "http://www.omdbapi.com/?s=" + titulo + "&" + "type=" + tipo + "&page=" + pag + "&apikey=5a1a52df";
    /* Peticion para obtener datos de peliculas*/
    $.ajax({
        url: pagina
    })
    .done(function(data){
        console.log(data);
        console.log("Total: " + data.totalResults);
        $("#enlace_1").remove();
        $("#enlace_2").remove();
        $("#breadcrumb").append("<li class='breadcrumb-item active' id='enlace_1' onclick='enlace_1()'><button>" + titulo + "</button></li>")
        $(".informacion_peli").hide();
        if (data.Response == "True"){
            numero_pelis = data.totalResults;
            for(let i=0; i < data.Search.length; i++){
                peli = "<div class='col-12 col-sm-6 col-md-4 col-lg-3 card pelicula'>";
                peli_titulo = "<h3 class='card-title'>" + data.Search[i].Title + "</h3>";
                peli_tipo = "<h5 class='card-text'>Tipo: " + data.Search[i].Type + "</h5>";
                peli_año = "<h5>Año: " + data.Search[i].Year + "</h5>";
                peli_info = "<div class='card-footer'><button class='btn btn-primary' value='" +
                    data.Search[i].imdbID + "' onclick='ver_detalles(this)'>Ver detalles</button></div>";

                if (data.Search[i].Poster == "N/A" ){
                    peli_portada = "<img class='card-img-top img-fluid' src='notfound.jpg'>";
                }else{
                    peli_portada = "<img class='card-img-top img-fluid' src='" + data.Search[i].Poster + "' onerror="+"this.src='notfound.jpg'"+">";
                }
                peli += peli_portada + peli_titulo + peli_tipo + peli_año + peli_info + "</div>";
                $("#cuerpo_pelis").append(peli);
            }
        }
        else{
            /*switch(tipo){
                case "movie":
                    categoria = "peliculas";
                    console.log("peliculas")
                case "series":
                    categoria = "series";
                    console.log("seriessasas")
                case "episodie":
                    categoria = "episodios";
                case "":
                    categoria = "peliculas, series o episodios"
                
            }*/
            if(tipo == "movie"){
                no_encontrado = "<div class='no_encontrado'> No se han encontrado peliculas con el nombre " +
                titulo + "</div>"
            }else if(tipo == "series"){
                no_encontrado = "<div class='no_encontrado'> No se han encontrado series con el nombre " +
                titulo + "</div>"
            }else if(tipo == "episodie"){
                no_encontrado = "<div class='no_encontrado'> No se han encontrado episodios con el nombre " +
                titulo + "</div>"
            }else if(tipo == ""){
                no_encontrado = "<div class='no_encontrado'> No se han encontrado peliculas, series o episodios con el nombre " +
                titulo + "</div>"
            }
            /*no_encontrado = "<div class='no_encontrado'> No se han encontrado "+ categoria + " con el nombre " +
            titulo + "</div>"*/
            $("#cuerpo_pelis").append(no_encontrado);
        }
    })
    
}


function ver_detalles(a){
    /*$("#cuerpo_pelis").empty();*/
    $(".informacion_peli").show();
    $("#cuerpo_pelis").hide();
    $("#informacion_peli").empty();
    $("#portada").empty();
    $("#portada").show();
    parar = true;
    console.log(a.value);
    id_peli = a.value;
    pagina = "http://www.omdbapi.com/?i=" + id_peli + "&apikey=5a1a52df";
    /* Peticion para obtener datos de peliculas*/
    $.ajax({
        url: pagina
    })
    .done(function(data){
        console.log(data);
        let detalles_titulo = data.Title;
        let detalles_actores = data.Actors;
        let detalles_pais = data.Country;
        let detalles_director = data.Director;
        let detalles_genero = data.Genere;
        let detalles_idioma = data.Languague;
        let detalles_trama = data.Plot;
        let detalles_poster = data.Poster;
        let detalles_produccion = data.Production;
        let detalles_publicado = data.Released;
        let detalles_respuesta = data.Response;
        let detalles_duracion = data.Runtime;
        let detalles_tipo = data.Type;
        let detalles_escritor = data.writer;
        let detalles_año = data.Year;
        ///
        let detalles_clasificacion = data.Ratings;
        let detalles_clasificacion_bdpeli = data.imdbRating;
        let detalles_votos_bdpeli = data.imdbVotes;
        let detalles_sitioweb = data.Website;
        
        // HTML
        if (data.detalles_poster == "N/A" ){
            info_poster = "<img class='img-fluid' src='notfound.jpg'>";
        }else{
            info_poster = "<img class='img-fluid' src='" + detalles_poster + "' onerror="+"this.src='notfound.jpg'"+">";
        }
        
        let info_titulo = "<h1 class'titulo'>" + detalles_titulo + "</h1>";
        let info_trama = "<h3>Trama:</h3><p class='caracteristicas'>" + detalles_trama + "</p>";
        let info_año = "<h3>Año</h3><p class='caracteristicas'>" + detalles_año + "</p>";
        let info_duracion = "<h3>Duracion</h3><p class='caracteristicas'>" + detalles_duracion + "</p>";
        let info_genero = "<h3>Genero</h3><p class='caracteristicas'>" + detalles_genero + "</p>";
        let info_tipo = "<h3>Tipo</h3><p class='caracteristicas'>" + detalles_tipo + "</p>";
        let info_idioma = "<h3>Idioma</h3><p class='caracteristicas'>" + detalles_idioma + "</p>";
        let info_pais = "<h3>Pais</h3><p class='caracteristicas'>" + detalles_pais + "</p>";
        let info_actores = "<h3>Actores:</h3><p class'caracteristicas'>" + detalles_actores + "</p>";
        let info_escritor = "<h3>Escritor</h3><p class='caracteristicas'>" + detalles_escritor + "</p>";
        let info_director = "<h3>Director</h3><p class='caracteristicas'>" + detalles_director + "</p>";
        let info_produccion = "<h3>Producción</h3><p class='caracteristicas'>" + detalles_produccion + "</p>";
        let info_publicado = "<h3>Fecha publicación</h3><p class='caracteristicas'>" + detalles_publicado + "</p>";
        let info_clasificacion_bdpeli = "<h3>Clasificación de Pelis</h3><p class='caracteristicas'>" + detalles_clasificacion_bdpeli + "</p>";
        let info_votos_bdpeli = "<h3>Votos de Pelis</h3><p class='caracteristicas'>" + detalles_votos_bdpeli + "</p>";

        informacion_peli = info_titulo + info_trama + info_año + info_duracion + info_genero + info_tipo + 
            info_idioma + info_pais + info_actores + info_escritor + info_director + info_produccion + info_publicado +
            info_clasificacion_bdpeli + info_votos_bdpeli;
        $("#portada").append(info_poster);
        $("#informacion_peli").append(informacion_peli);
        $("#enlace_1").removeClass("active");
        $("#breadcrumb").append("<li class='breadcrumb-item active' id='enlace_2' onclick='enlace_2()'><button>" + detalles_titulo + "</button></li>")

    });
}


function enlace_1(){
    console.log("Se ha hehco click en el enlace 1");
    $(".informacion_peli").hide();
    $("#cuerpo_pelis").show();
    $("#portada").hide();
    $("#portada_home").hide();
    parar = false;
}


function enlace_2(){
    $(".informacion_peli").show();
    $("#cuerpo_pelis").hide();
    $("#portada").show();
    $("#portada_home").hide();
    parar = true;
}

$(document).ready(function(){
    $('#loading').hide();
    // Activar boton buscar
    $("#busqueda").keypress(function(){
        if ($("#busqueda").val().length >= 2){
            $("#buscar").removeAttr("disabled");
        }else if ($("#busqueda").val().length < 2){
            $("#buscar").attr("disabled", "disabled");
        }

    });

    $("#buscar").click(function(){
        buscar_peli()
    });

    $("#home_button").click(function(){
        $(".informacion_peli").hide();
        $("#cuerpo_pelis").hide();
        $("#portada").hide();
        $("#portada_home").show();
        parar = true;
    });

    


    // Each time the user scrolls
    $(window).scroll(function() {
        if (pag > numero_pelis / 10){
            fin = true;
        }else{
            fin = false;
        }
        // End of the document reached?
        if ($(document).height() - $(window).height() == $(window).scrollTop() &! fin &! en_curso &! parar) {
            $('#loading').show();
            en_curso = true;
            if (pag < numero_pelis / 10){
                pag ++;
            }
            else{
                fin = true;
            }
            
            $.ajax({
                url: pagina = "http://www.omdbapi.com/?s=" + titulo + "&" + "type=" + tipo + "&page=" + pag + "&apikey=5a1a52df",
                success: function(data) {
                    console.log(data);
                    for(let i=0; i < data.Search.length; i++){
                        peli = "<div class='col-12 col-sm-6 col-md-4 col-lg-3 card pelicula'>";
                        peli_titulo = "<h3 class='card-title'>" + data.Search[i].Title + "</h3>";
                        peli_tipo = "<h5 class='card-text'>Tipo: " + data.Search[i].Type + "</h5>";
                        peli_año = "<h5>Año: " + data.Search[i].Year + "</h5>";
                        peli_info = "<div class='card-footer'><button class='btn btn-primary' value='" +
                            data.Search[i].imdbID + "' onclick='ver_detalles(this)'>Ver detalles</button></div>";
                        if (data.Search[i].Poster == "N/A" ){
                            peli_portada = "<img class='card-img-top img-fluid' src='notfound.jpg'>";
                        }else{
                            peli_portada = "<img class='card-img-top img-fluid' src='" + data.Search[i].Poster + "' onerror="+"this.src='notfound.jpg'"+">";
                        }
                        peli += peli_portada + peli_titulo + peli_tipo + peli_año + peli_info + "</div>";
                        $("#cuerpo_pelis").append(peli);
                    }
                    $('#loading').hide();
                    en_curso = false;
                }
            });
        }
    });


});
