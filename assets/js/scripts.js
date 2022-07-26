const header = document.querySelector('.header-apresentacao')

        let posicaoScroll = 0;
        let controleAnimacao = false;

        function doSomething(scrollPos) {
            header.style.background = 'rgba(76, 121, 66, 1)';
        }

        document.addEventListener('scroll', function (e) {
            posicaoScroll = window.scrollY;

            if(posicaoScroll == 0){
                header.style.background = 'transparent'
                return
            }

            if (!controleAnimacao) {

                window.requestAnimationFrame( () => {

                    doSomething(posicaoScroll);
                    controleAnimacao = false;
                });

                controleAnimacao = true;
            }
        });