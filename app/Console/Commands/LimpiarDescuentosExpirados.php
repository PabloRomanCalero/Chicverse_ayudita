<?php

namespace App\Console\Commands;

use App\Models\Descuento;
use Carbon\Carbon;
use Illuminate\Console\Command;

class LimpiarDescuentosExpirados extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'descuentos:limpiar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Elimina los descuentos expirados';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $descuentosExpirados = Descuento::where('fecha_expiracion', '<', Carbon::now())->get();
        foreach ($descuentosExpirados as $descuento) {
            $descuento->delete();
        }
        $this->info('Se eliminaron los descuentos expirados correctamente.');
    }
}
