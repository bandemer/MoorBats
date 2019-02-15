<?php
/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{
    /**
     * Copy assets
     */
    public function build()
    {
        $filesToCopy = [
            'sound/sfx_exp_various4.wav',
            'img/Bat_Booger.png',
            'img/Bat_Booger_Explosion.png',
            'img/Bat_Brains.png',
            'img/Bat_Brains_Explosion.png',
            'img/Bat_Purple.png',
            'img/Bat_Purple_Explosion.png',
            'img/Bat_Square.png',
            'img/Bat_Square_Explosion.png',
        ];

        $sourcePath = '/home/matthias/nas_daten/projekte/MoorBats/assets/';
        $destinationPath = __DIR__.'/assets/';

        foreach ($filesToCopy AS $f) {
            $this->taskFilesystemStack()
                ->copy($sourcePath . $f, $destinationPath . $f)
                ->run();
        }

        $this->taskExec('wget')
            ->option('directory-prefix', 'js/')
            ->arg('https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js')
            ->run();
    }
}