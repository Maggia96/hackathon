<?php

namespace App\Console\Commands;

use App\Models\Developer;
use App\Models\Development;
use App\Models\Hackathon;
use App\Models\User;
use App\Models\Winner;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class HackathonCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hackathon:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        //php artisan schedule:run

        $developmentModel = new Development();
        $developerModel = new Developer();
        $hackathonModel = new Hackathon();
        $winnerModel = new Winner();
        $userModel = new User();

        try {
            DB::beginTransaction();

            $hackathon = $hackathonModel->createHackathonCron($this->getUsersFromAPI());

            for ($i = 0; $i < 10; $i++) {
                $development = $developmentModel->createDevelopmentCron($hackathon->id);
                $user = $userModel->createUserCron($this->getUsersFromAPI());
                $developer = $developerModel->createDeveloperCron(
                    $this->getUsersFromAPI(),
                    $hackathon->id,
                    $user->id,
                    $development->id
                );
                if ($i < 3) {
                    $winnerModel->createWinnerCron($i + 1, $developer->id);
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function getUsersFromAPI()
    {
        $response = Http::get('https://randomuser.me/api');
        $body = json_decode($response->body());
        return $body->results[0];
    }
}
