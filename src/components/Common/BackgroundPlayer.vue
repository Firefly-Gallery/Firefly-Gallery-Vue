<template>
    <div></div>
</template>
  
<script setup>
    import { Howl } from 'howler';
    import { onMounted } from 'vue';

    // let src;
    // defineProps({src})
    const props = defineProps({
        src: {
            type: [String]
        }
    })
  
    let audio = null;
    onMounted(function() {
        audio = new Howl({
            src: [props.src], // Path to your audio file
            loop: true
        });

      
        audio.once('load', function(){
            console.log(audio);
            // audio.volume = 0;
            audio.play();
            // fadeIn();
        });
    });
    
    const fadeIn = () => {
        const duration = 500;
        const startVolume = 0;
        const endVolume = 1;
        let currentTime = 0;
  
        const fadeInterval = setInterval(() => {
          const volume = Math.min(
            startVolume + (currentTime / duration) * (endVolume - startVolume),
            endVolume
          );
          audio.volume(volume);
          currentTime += 100;
          
          if (currentTime >= duration) {
            clearInterval(fadeInterval);
          }
        }, 100);
    };
</script>
  